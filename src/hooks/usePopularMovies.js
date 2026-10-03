import { useQuery } from '@tanstack/react-query'

async function fetchPopularMovies() {
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken) return []

  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
    headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error('Unable to load popular movies')

  const data = await response.json()
  return data.results.slice(0, 15).map((movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Release date unknown',
    rating: movie.vote_average,
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/092c43/ffffff?text=No+poster',
  }))
}

export function usePopularMovies() {
  const query = useQuery({ queryKey: ['popular-movies'], queryFn: fetchPopularMovies, staleTime: 1000 * 60 * 10 })
  return { movies: query.data ?? [], isLoading: query.isLoading }
}