import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const accountId = import.meta.env.VITE_TMDB_ACCOUNT_ID || '22301558'
const imageBase = 'https://image.tmdb.org/t/p/w342'

function getAccessToken() {
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken) throw new Error('TMDB access token is not configured.')
  return accessToken
}

async function fetchWatchlist(mediaType) {
  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/${mediaType}?language=en-US&page=1`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${getAccessToken()}` },
  })
  if (!response.ok) throw new Error(`Unable to load ${mediaType} watchlist.`)
  const data = await response.json()

  return {
    items: (data.results ?? []).map((item) => ({
      id: item.id,
      title: item.title || item.name,
      overview: item.overview,
      releaseDate: item.release_date || item.first_air_date || 'Release date unknown',
      rating: item.vote_average,
      poster: item.poster_path ? `${imageBase}${item.poster_path}` : 'https://placehold.co/342x513/e1eaed/52717d?text=No+poster',
      mediaType,
    })),
    total: data.total_results ?? 0,
  }
}

async function removeFromWatchlist(mediaType, itemId) {
  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ media_type: mediaType === 'tv' ? 'tv' : 'movie', media_id: Number(itemId), watchlist: false }),
  })
  if (!response.ok) throw new Error('Unable to remove item from watchlist.')
  return response.json()
}

export function useWatchlist(mediaType) {
  const query = useQuery({
    queryKey: ['account-watchlist', accountId, mediaType],
    queryFn: () => fetchWatchlist(mediaType),
    staleTime: 1000 * 60 * 5,
  })

  return {
    items: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}

export function useRemoveWatchlist(mediaType, itemId) {
  const queryClient = useQueryClient()
  const queryKey = ['account-watchlist', accountId, mediaType]

  return useMutation({
    mutationFn: () => removeFromWatchlist(mediaType, itemId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })
      const previous = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (watchlist) => {
        if (!watchlist) return watchlist
        const items = watchlist.items.filter((item) => item.id !== Number(itemId))
        return { items, total: Math.max(0, watchlist.total - 1) }
      })
      return { previous }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
