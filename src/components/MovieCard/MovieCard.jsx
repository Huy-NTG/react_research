import './MovieCard.scss'
import { Link } from 'react-router-dom'

function MovieCard({ movie, mediaType = 'movie' }) {
  const detailPath = mediaType === 'tv' ? `/movies/${movie.id}?type=tv` : `/movies/${movie.id}`
  return <Link className="movie-card" to={detailPath}>
    <div className="poster-wrap"><img src={movie.poster} alt={`${movie.title} poster`} />
      <span className="card-menu" aria-hidden="true">•••</span></div>
    <h3>{movie.title}</h3>
    <p>{movie.releaseDate} <span className="rating">★ {movie.rating?.toFixed(1)}</span></p>
  </Link>
}

export default MovieCard