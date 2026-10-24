import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const accountId = import.meta.env.VITE_TMDB_ACCOUNT_ID || '22301558'
const localListKey = 'tmdb-my-list'

function getAccessToken() {
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken) throw new Error('TMDB access token is not configured.')
  return accessToken
}

async function fetchAccountMovies(type, mediaType) {
  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/${type}/${mediaType === 'tv' ? 'tv' : 'movies'}?language=en-US&page=1`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${getAccessToken()}` },
  })
  if (!response.ok) throw new Error(`Unable to load account ${type}.`)
  const data = await response.json()
  return data.results ?? []
}

async function updateAccountMovie(type, movieId, enabled, mediaType) {
  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/${type}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${getAccessToken()}` },
    body: JSON.stringify({ media_type: mediaType, media_id: Number(movieId), [type]: enabled }),
  })
  if (!response.ok) throw new Error(`Unable to update ${type}.`)
  return response.json()
}

function readLocalList() {
  try {
    return JSON.parse(localStorage.getItem(localListKey) || '[]')
  } catch {
    return []
  }
}

function writeLocalList(list) {
  localStorage.setItem(localListKey, JSON.stringify(list))
  return list
}

function useAccountMovieMutation(type, movie, mediaType, queryKey) {
  const queryClient = useQueryClient()
  const movieId = Number(movie?.id)
  return useMutation({
    mutationFn: (enabled) => updateAccountMovie(type, movieId, enabled, mediaType),
    onMutate: async (enabled) => {
      await queryClient.cancelQueries({ queryKey })
      const previous = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (movies = []) => enabled
        ? [...movies.filter((item) => item.id !== movieId), movie]
        : movies.filter((item) => item.id !== movieId))
      return { previous }
    },
    onError: (_error, _enabled, context) => queryClient.setQueryData(queryKey, context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}

export function useMovieActions(movie, mediaType = 'movie') {
  const movieId = Number(movie?.id)
  const watchlistKey = ['account-movies', accountId, mediaType, 'watchlist']
  const favoriteKey = ['account-movies', accountId, mediaType, 'favorite']
  const listKey = ['my-list']
  const watchlistQuery = useQuery({ queryKey: watchlistKey, queryFn: () => fetchAccountMovies('watchlist', mediaType), enabled: Boolean(movieId), staleTime: 1000 * 60 * 5 })
  const favoriteQuery = useQuery({ queryKey: favoriteKey, queryFn: () => fetchAccountMovies('favorite', mediaType), enabled: Boolean(movieId), staleTime: 1000 * 60 * 5 })
  const listQuery = useQuery({ queryKey: listKey, queryFn: readLocalList, initialData: readLocalList, staleTime: Infinity })
  const watchlistMutation = useAccountMovieMutation('watchlist', movie, mediaType, watchlistKey)
  const favoriteMutation = useAccountMovieMutation('favorite', movie, mediaType, favoriteKey)
  const queryClient = useQueryClient()
  const listMutation = useMutation({
    mutationFn: (enabled) => {
      const nextList = enabled ? [...listQuery.data.filter((item) => item.id !== movieId), movie] : listQuery.data.filter((item) => item.id !== movieId)
      return writeLocalList(nextList)
    },
    onMutate: async (enabled) => {
      await queryClient.cancelQueries({ queryKey: listKey })
      const previous = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, enabled
        ? [...(previous ?? []).filter((item) => item.id !== movieId), movie]
        : (previous ?? []).filter((item) => item.id !== movieId))
      return { previous }
    },
    onError: (_error, _enabled, context) => queryClient.setQueryData(listKey, context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: listKey }),
  })
  const isWatchlisted = watchlistQuery.data?.some((item) => item.id === movieId) ?? false
  const isFavorite = favoriteQuery.data?.some((item) => item.id === movieId) ?? false
  const isInList = listQuery.data?.some((item) => item.id === movieId) ?? false

  return {
    isWatchlisted,
    isFavorite,
    isInList,
    isPending: watchlistMutation.isPending || favoriteMutation.isPending || listMutation.isPending,
    toggleWatchlist: () => watchlistMutation.mutate(!isWatchlisted),
    toggleFavorite: () => favoriteMutation.mutate(!isFavorite),
    toggleList: () => listMutation.mutate(!isInList),
  }
}