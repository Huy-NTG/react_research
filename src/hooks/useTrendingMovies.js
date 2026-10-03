import { useQuery } from '@tanstack/react-query'

const fallbackMovies = [
  { id: 1, title: 'East of Eden', releaseDate: 'October 1, 2026', rating: 7.8, poster: 'https://image.tmdb.org/t/p/w500/5qHoazZiaLe7oFBok7Xl0bY1N5g.jpg' },
  { id: 2, title: 'Digger', releaseDate: 'October 16, 2026', rating: 7.6, poster: 'https://image.tmdb.org/t/p/w500/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg' },
  { id: 3, title: 'Kill Jackie', releaseDate: 'October 2, 2026', rating: 7.4, poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { id: 4, title: 'Doing Life', releaseDate: 'October 2, 2026', rating: 7.3, poster: 'https://image.tmdb.org/t/p/w500/7m3W5y0Kx8hH0B9gA5sT7vW0pL3.jpg' },
  { id: 5, title: 'Coven Academy', releaseDate: 'October 1, 2026', rating: 7.2, poster: 'https://image.tmdb.org/t/p/w500/9f5sJ8T8XqY8Y8gF4rM1u0J3q4W.jpg' },
  { id: 6, title: 'WAR', releaseDate: 'October 2, 2026', rating: 7.1, poster: 'https://image.tmdb.org/t/p/w500/6HYYpVf2gkO5rJxF8zU0H7JwM1P.jpg' },
  { id: 7, title: 'Verity: Bí Mật Bị Chôn Vùi', releaseDate: 'October 2, 2026', rating: 7.0, poster: 'https://image.tmdb.org/t/p/w500/3R8yO2s0b6J6xM2qU8tQ2w6cQ1e.jpg' },
  { id: 8, title: 'I Would', releaseDate: 'October 1, 2026', rating: 6.9, poster: 'https://image.tmdb.org/t/p/w500/4K6s6sZ8b6Q6q4X0J5g7L2t9u3V.jpg' },
]

async function fetchTrending(period) {
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken) return fallbackMovies
  const endpoint = period === 'Today' ? 'day' : 'week'
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/${endpoint}?language=en-US`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!response.ok) throw new Error('Unable to load trending movies')
  const data = await response.json()
  return data.results.slice(0, 20).map((movie) => ({ id: movie.id, title: movie.title, releaseDate: movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Release date unknown', rating: movie.vote_average, poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/092c43/ffffff?text=No+poster' }))
}

export function useTrendingMovies(period) {
  const query = useQuery({ queryKey: ['trending-movies', period], queryFn: () => fetchTrending(period), staleTime: 1000 * 60 * 5 })
  return { movies: query.data ?? fallbackMovies, isLoading: query.isLoading }
}