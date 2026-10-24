import { CalendarDays, ChevronDown, MoreHorizontal, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import WatchlistItem from '../../components/WatchlistItem/WatchlistItem'
import { useWatchlist } from '../../hooks/useWatchlist'
import './WatchlistPage.scss'

function WatchlistPage() {
  const [activeTab, setActiveTab] = useState('Movies')
  const [sortAscending, setSortAscending] = useState(false)
  const moviesWatchlist = useWatchlist('movies')
  const tvWatchlist = useWatchlist('tv')
  const currentWatchlist = activeTab === 'TV Shows' ? tvWatchlist : moviesWatchlist
  const { items, isLoading, isError, error } = currentWatchlist
  const tabs = [
    { label: 'Movies', count: moviesWatchlist.total },
    { label: 'TV Shows', count: tvWatchlist.total },
    { label: 'Calendar', count: null },
  ]

  return <div className="watchlist-page">
    <Header />
    <section className="profile-banner">
      <div className="page-width profile-banner-inner">
        <span className="profile-avatar">N</span>
        <h1>NguyenHuy120304</h1>
      </div>
    </section>
    <nav className="account-nav" aria-label="Account navigation">
      <div className="page-width account-nav-inner">
        <a href="/profile">Overview <ChevronDown size={14} /></a>
        <a href="/lists" className="is-active">My Stuff <ChevronDown size={14} /></a>
        <a href="/ratings">Đánh giá <ChevronDown size={14} /></a>
        <a href="/lists">Danh sách</a>
        <a href="/badges">Badges</a>
      </div>
    </nav>
    <main className="watchlist-content page-width">
      <div className="watchlist-heading">
        <h2>My Watchlist</h2>
        <div className="watchlist-heading-actions">
          <button type="button"><CalendarDays size={14} /> Feeds <ChevronDown size={15} /></button>
          <button type="button" aria-label="More watchlist options"><MoreHorizontal size={19} /></button>
        </div>
      </div>
      <div className="watchlist-tabs" role="tablist" aria-label="Watchlist type">
        {tabs.map((tab) => <button
          className={activeTab === tab.label ? 'is-active' : ''}
          key={tab.label}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.label}
          onClick={() => setActiveTab(tab.label)}
        >
          {tab.label}{tab.count !== null && <span>{tab.count}</span>}
        </button>)}
      </div>
      <div className="watchlist-filters">
        <span className="filter-label">LỌC BỞI:</span>
        <button type="button">Thêm ngày <ChevronDown size={15} /></button>
        <span className="filter-label">ĐẶT HÀNG:</span>
        <button className="sort-button" type="button" aria-label="Toggle sort order" onClick={() => setSortAscending(!sortAscending)}>
          <SlidersHorizontal size={15} className={sortAscending ? 'is-ascending' : ''} />
        </button>
      </div>
      {activeTab === 'Calendar' ? <section className="watchlist-empty" aria-live="polite">
        <h3>Your calendar is empty</h3>
        <p>Lịch phát hành sẽ hiển thị ở đây khi bạn có dữ liệu watchlist.</p>
      </section> : <section className="watchlist-results" aria-live="polite">
        {isLoading && <p className="watchlist-state">Đang tải danh sách theo dõi...</p>}
        {isError && <p className="watchlist-state watchlist-state-error">{error?.message || 'Không thể tải danh sách theo dõi.'}</p>}
        {!isLoading && !isError && items.length === 0 && <section className="watchlist-empty">
          <h3>Your watchlist is empty</h3>
          <p>Thêm phim và chương trình truyền hình vào danh sách theo dõi để xem chúng ở đây.</p>
          <a href="/">Khám phá phim</a>
        </section>}
        {!isLoading && !isError && items.length > 0 && <div className="watchlist-items">
          {(sortAscending ? [...items].reverse() : items).map((item) => <WatchlistItem item={item} key={item.id} />)}
        </div>}
      </section>}
    </main>
  </div>
}

export default WatchlistPage
