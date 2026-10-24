import { X } from 'lucide-react'
import './TrailerModal.scss'

function TrailerModal({ trailer, onClose }) {
  if (!trailer) return null

  return <div className="trailer-modal" role="dialog" aria-modal="true" aria-label={trailer.name} onClick={onClose}>
    <div className="trailer-dialog" onClick={(event) => event.stopPropagation()}>
      <button className="trailer-close" type="button" aria-label="Close trailer" onClick={onClose}><X size={20} /></button>
      <div className="trailer-frame"><iframe src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`} title={trailer.name} allow="autoplay; encrypted-media" allowFullScreen /></div>
    </div>
  </div>
}

export default TrailerModal