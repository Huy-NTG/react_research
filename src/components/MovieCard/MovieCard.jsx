import './MovieCard.scss'

function MovieCard({ movie }) {
  return <a className="movie-card" href={`/movie/${movie.id}`}>
    <div className="poster-wrap"><img src={movie.poster} alt={`${movie.title} poster`} />
      <span className="card-menu" aria-hidden="true">•••</span></div>
    <h3>{movie.title}</h3>
    <p>{movie.releaseDate} <span className="rating">★ {movie.rating?.toFixed(1)}</span></p>
  </a>
}

export default MovieCard