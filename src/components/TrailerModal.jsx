import { X } from 'lucide-react'
import { useEffect } from 'react'

function TrailerModal({ trailer, onClose }) {
  useEffect(() => {
    if (!trailer) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [trailer, onClose])

  if (!trailer) return null
  return <div className="trailer-modal" role="presentation" onClick={onClose}>
    <div className="trailer-dialog" role="dialog" aria-modal="true" aria-label={`${trailer.movie.title} trailer`} onClick={(event) => event.stopPropagation()}>
      <button className="trailer-close" type="button" aria-label="Close trailer" onClick={onClose}><X size={22} /></button>
      <div className="trailer-frame"><iframe src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`} title={trailer.name} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
    </div>
  </div>
}

export default TrailerModal