import { useQuery } from '@tanstack/react-query'

async function fetchMovieDetails(movieId, mediaType) {
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken) throw new Error('TMDB access token is not configured.')

  const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?language=en-US&append_to_response=credits,videos,similar`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error('Unable to load movie details.')
  return response.json()
}

export function useMovieDetails(movieId, mediaType = 'movie') {
  const query = useQuery({ queryKey: ['movie-details', mediaType, movieId], queryFn: () => fetchMovieDetails(movieId, mediaType), enabled: Boolean(movieId), staleTime: 1000 * 60 * 10 })
  return { movie: query.data, isLoading: query.isLoading, isError: query.isError, error: query.error }
}
