import { usePopularMovies } from '../hooks/usePopularMovies'

function PopularMovieCard({ movie }) {
  return <a className="movie-card" href={`/movie/${movie.id}`}><div className="poster-wrap"><img src={movie.poster} alt={`${movie.title} poster`} /><span className="card-menu" aria-hidden="true">•••</span></div><h3>{movie.title}</h3><p>{movie.releaseDate} <span className="rating">★ {movie.rating?.toFixed(1)}</span></p></a>
}

function PopularSection() {
  const { movies, isLoading } = usePopularMovies()

  return <section className="popular-section"><div className="page-width">
    <div className="section-heading popular-heading"><h2>What's Popular</h2><div className="popular-switcher" role="group" aria-label="Popular movie filter"><button className="active" type="button">In Theaters</button></div></div>
    <div className="movie-rail popular-rail">
      {isLoading && <p className="loading-state">Loading popular movies...</p>}
      {!isLoading && movies.length === 0 && <p className="loading-state">No popular movies available right now.</p>}
      {movies.map((movie) => <PopularMovieCard movie={movie} key={movie.id} />)}
    </div>
  </div></section>
}

export default PopularSection