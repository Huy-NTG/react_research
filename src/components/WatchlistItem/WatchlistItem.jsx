import { Heart, ListPlus, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRemoveWatchlist } from '../../hooks/useWatchlist'
import './WatchlistItem.scss'

function formatDate(date) {
  if (!date || date === 'Release date unknown') return 'Release date unknown'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function WatchlistItem({ item }) {
  const mediaType = item.mediaType === 'tv' ? 'tv' : 'movie'
  const detailPath = mediaType === 'tv' ? `/movies/${item.id}?type=tv` : `/movies/${item.id}`
  const removeMutation = useRemoveWatchlist(mediaType, item.id)
  const score = Number.isFinite(item.rating) ? Math.round(item.rating * 10) : null

  return <article className="watchlist-item">
    <Link className="watchlist-item-poster" to={detailPath} aria-label={`View details for ${item.title}`}>
      <img src={item.poster} alt={`${item.title} poster`} />
    </Link>
    <div className="watchlist-item-content">
      <div className="watchlist-item-info">
        <div className="watchlist-score">{score !== null ? `${score}%` : '—'}</div>
        <div>
          <Link className="watchlist-item-title" to={detailPath}>{item.title}</Link>
          <p>{formatDate(item.releaseDate)}</p>
        </div>
      </div>
      <p className="watchlist-item-overview">{item.overview || 'No overview available for this title.'}</p>
    </div>
    <div className="watchlist-item-actions">
      <button type="button" aria-label={`Rate ${item.title}`}><Star size={16} /> <span>Rate it!</span></button>
      <button type="button" aria-label={`Favorite ${item.title}`}><Heart size={16} /> <span>Favorite</span></button>
      <button type="button" aria-label={`Add ${item.title} to list`}><ListPlus size={16} /> <span>Add to list</span></button>
      <button type="button" className="remove-watchlist-button" aria-label={`Remove ${item.title} from watchlist`} onClick={() => removeMutation.mutate()} disabled={removeMutation.isPending}>
        <X size={16} /> <span>{removeMutation.isPending ? 'Removing...' : 'Remove'}</span>
      </button>
      {removeMutation.isError && <span className="watchlist-remove-error">{removeMutation.error.message}</span>}
    </div>
  </article>
}

export default WatchlistItem
