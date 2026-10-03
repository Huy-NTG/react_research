import { useQuery } from '@tanstack/react-query'

async function fetchMovieTrailers(movies) {
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken || movies.length === 0) return []

  const trailerResults = await Promise.all(movies.slice(0, 10).map(async (movie) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, {
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) return []
    const data = await response.json()
    const videos = data.results ?? []
    const trailer = videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official)
      ?? videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer')
    return trailer ? [{ ...trailer, movie }] : []
  }))

  return trailerResults.flat().slice(0, 10)
}

export function useMovieTrailers(movies) {
  const query = useQuery({
    queryKey: ['movie-trailers', movies.map((movie) => movie.id)],
    queryFn: () => fetchMovieTrailers(movies),
    enabled: movies.length > 0,
    staleTime: 1000 * 60 * 10,
  })
  return { trailers: query.data ?? [], isLoading: query.isLoading }
}