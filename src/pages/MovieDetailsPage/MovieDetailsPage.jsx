import { ArrowLeft, CalendarDays, Clock3, ExternalLink, Play, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useMovieDetails } from '../../hooks/useMovieDetails'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'
import './MovieDetailsPage.scss'

const imageBase = 'https://image.tmdb.org/t/p/'

function formatDate(date) {
  if (!date) return 'Release date unknown'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatRuntime(runtime) {
  if (!runtime) return 'Runtime unknown'
  return `${Math.floor(runtime / 60)}h ${runtime % 60}m`
}

function toMovieCard(movie) {
  return { id: movie.id, title: movie.title, releaseDate: formatDate(movie.release_date), rating: movie.vote_average, poster: movie.poster_path ? `${imageBase}w500${movie.poster_path}` : 'https://placehold.co/500x750/092c43/ffffff?text=No+poster' }
}

function MovieDetailsPage() {
  const { movieId } = useParams()
  const { movie, isLoading, isError, error } = useMovieDetails(movieId)

  if (isLoading) return <div className="details-state"><p>Loading movie details...</p></div>
  if (isError) return <div className="details-state details-state-error"><p>{error?.message || 'Something went wrong while loading this movie.'}</p><Link to="/">Back to homepage</Link></div>
  if (!movie) return null

  const trailer = movie.videos?.results?.find((video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official)
    ?? movie.videos?.results?.find((video) => video.site === 'YouTube' && video.type === 'Trailer')
  const cast = movie.credits?.cast?.slice(0, 8) ?? []
  const similarMovies = movie.similar?.results?.slice(0, 10).map(toMovieCard) ?? []

  return <div className="movie-details-page">
    <header className="details-topbar"><Link to="/" className="back-link"><ArrowLeft size={18} /> Back to movies</Link><span>TMDB / Movie details</span></header>
    <main>
      <section className="details-hero" style={{ '--backdrop': `url(${imageBase}original${movie.backdrop_path || movie.poster_path})` }}>
        <div className="page-width details-hero-inner">
          <img className="details-poster" src={movie.poster_path ? `${imageBase}w500${movie.poster_path}` : 'https://placehold.co/500x750/092c43/ffffff?text=No+poster'} alt={`${movie.title} poster`} />
          <div className="details-copy">
            <p className="details-kicker">{movie.original_language?.toUpperCase()} / {movie.status}</p>
            <h1>{movie.title} <span>{movie.release_date?.slice(0, 4) && `(${movie.release_date.slice(0, 4)})`}</span></h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            <div className="details-meta"><span><CalendarDays size={16} /> {formatDate(movie.release_date)}</span><span><Clock3 size={16} /> {formatRuntime(movie.runtime)}</span><span>{movie.origin_country?.join(', ') || 'International'}</span></div>
            <div className="genre-list">{movie.genres?.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>
            <div className="score-row"><div className="score"><Star size={17} fill="currentColor" /> <strong>{movie.vote_average?.toFixed(1)}</strong><small>/ 10</small></div><span>{movie.vote_count?.toLocaleString()} TMDB votes</span></div>
            <div className="details-actions">{trailer && <a className="trailer-button" href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer"><Play size={16} fill="currentColor" /> Watch trailer</a>}{movie.homepage && <a className="homepage-button" href={movie.homepage} target="_blank" rel="noreferrer">Official site <ExternalLink size={15} /></a>}</div>
          </div>
        </div>
      </section>
      <div className="page-width details-content">
        <section className="overview-section"><p className="eyebrow">THE STORY</p><h2>Overview</h2><p>{movie.overview || 'No overview available for this movie.'}</p></section>
        {cast.length > 0 && <section className="cast-section"><p className="eyebrow">THE PEOPLE</p><h2>Top cast</h2><div className="cast-rail">{cast.map((person) => <article className="cast-card" key={person.credit_id}><img src={person.profile_path ? `${imageBase}w185${person.profile_path}` : 'https://placehold.co/185x278/e1eaed/52717d?text=No+photo'} alt={person.name} /><div><strong>{person.name}</strong><span>{person.character || 'Cast member'}</span></div></article>)}</div></section>}
        {similarMovies.length > 0 && <section className="similar-section"><p className="eyebrow">MORE TO WATCH</p><h2>Similar movies</h2><div className="movie-rail">{similarMovies.map((similarMovie) => <MovieCard movie={similarMovie} key={similarMovie.id} />)}</div></section>}
      </div>
    </main>
    <Footer />
  </div>
}

export default MovieDetailsPage