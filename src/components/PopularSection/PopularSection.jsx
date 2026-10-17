import { usePopularMovies } from '../../hooks/usePopularMovies'
import MovieCard from '../MovieCard/MovieCard'
import './PopularSection.scss'

function PopularSection() {
  const { movies, isLoading } = usePopularMovies()

  return <section className="popular-section"><div className="page-width">
    <div className="section-heading popular-heading"><h2>What's Popular</h2><div className="popular-switcher" role="group" aria-label="Popular movie filter"><button className="active" type="button">In Theaters</button></div></div>
    <div className="movie-rail popular-rail">
      {isLoading && <p className="loading-state">Loading popular movies...</p>}
      {!isLoading && movies.length === 0 && <p className="loading-state">No popular movies available right now.</p>}
      {movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
    </div>
  </div></section>
}

export default PopularSection