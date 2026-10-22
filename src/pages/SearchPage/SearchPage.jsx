import { AlertCircle, ChevronLeft, ChevronRight, Search as SearchIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import './SearchPage.scss'

function formatDate(date) {
  if (!date) return 'Release date unknown'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('query')?.trim() || ''
  const type = params.get('type') === 'tv' ? 'tv' : 'movie'
  const page = Math.max(1, Number(params.get('page')) || 1)
  const { data, isLoading, isFetching, isError, error } = useSearch(type, query, page)

  const setType = (nextType) => setParams({ query, type: nextType, page: '1' })
  const setPage = (nextPage) => {
    setParams({ query, type, page: String(nextPage) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <main className="search-page page-width">
    <div className="search-page-heading">
      <div>
        <p className="eyebrow">DISCOVER SOMETHING NEW</p>
        <h1>Search results{query && <span> for “{query}”</span>}</h1>
      </div>
      {isFetching && <span className="search-status">Updating results...</span>}
    </div>
    <div className="search-layout">
      <aside className="search-sidebar">
        <h2>Search Results</h2>
        {[['movie', 'Movies'], ['tv', 'TV Shows']].map(([value, label]) => <button className={type === value ? 'active' : ''} type="button" key={value} onClick={() => setType(value)}>{label}<span>{type === value ? data.totalResults.toLocaleString() : '—'}</span></button>)}
        <p className="search-tip"><SearchIcon size={15} /> Try a movie title, actor, or TV show name.</p>
      </aside>
      <section className="results-column" aria-live="polite">
        {!query && <div className="empty-state"><SearchIcon size={34} /><h2>What would you like to find?</h2><p>Use the search field above to find movies and TV shows.</p></div>}
        {isLoading && query && <div className="loading-results">{[1, 2, 3].map((item) => <div className="result-skeleton" key={item} />)}</div>}
        {isError && <div className="empty-state error-state"><AlertCircle size={34} /><h2>Could not load results</h2><p>{error.message}</p></div>}
        {!isLoading && !isError && query && data.results.length === 0 && <div className="empty-state"><SearchIcon size={34} /><h2>No results found</h2><p>Try another keyword or switch between movies and TV shows.</p></div>}
        {query && data.results.map((item) => <article className="search-result" key={item.id}>
          <img src={item.poster} alt={`${item.title} poster`} />
          <div><h2>{item.title} {item.originalTitle && item.originalTitle !== item.title && <small>({item.originalTitle})</small>}</h2><p className="result-date">{formatDate(item.date)}</p><p>{item.overview || 'No overview available for this title.'}</p></div>
        </article>)}
        {query && data.results.length > 0 && <nav className="pagination" aria-label="Search results pages">
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={17} /> Previous</button>
          <span>Page <strong>{page}</strong> of {data.totalPages}</span>
          <button type="button" disabled={page >= data.totalPages} onClick={() => setPage(page + 1)}>Next <ChevronRight size={17} /></button>
        </nav>}
      </section>
    </div>
  </main>
}

export default SearchPage
