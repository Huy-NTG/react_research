import { Play } from 'lucide-react'
import { useState } from 'react'
import { useMovieTrailers } from '../hooks/useMovieTrailers'
import TrailerModal from './TrailerModal'

function TrailerSection({ movies }) {
  const [activeTrailer, setActiveTrailer] = useState(null)
  const { trailers, isLoading } = useMovieTrailers(movies)

  return <section className="trailers"><div className="page-width">
    <div className="section-heading trailer-heading"><div><p className="eyebrow">WATCH THE LATEST</p><h2>Latest Trailers</h2></div><div className="trailer-switcher" role="group" aria-label="Trailer filter"><button className="active" type="button">Popular</button><button type="button">In Theaters</button></div></div>
    <div className="trailer-rail">
      {isLoading && <p className="trailer-message">Loading trailers...</p>}
      {!isLoading && trailers.length === 0 && <p className="trailer-message">No trailers available right now.</p>}
      {trailers.map((trailer) => <button className="trailer-card" type="button" key={trailer.id} onClick={() => setActiveTrailer(trailer)}><span className="trailer-image"><img src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`} alt={`${trailer.movie.title} trailer`} /><span className="trailer-play"><Play size={24} fill="currentColor" /></span></span><strong>{trailer.movie.title}</strong><span>{trailer.name}</span></button>)}
    </div>
  </div><TrailerModal trailer={activeTrailer} onClose={() => setActiveTrailer(null)} /></section>
}

export default TrailerSection