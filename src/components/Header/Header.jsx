import { Bell, CirclePlus, Menu, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Header.scss'

const navigation = ['Movies', 'TV Shows', 'People', 'Awards', 'More']

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [searchValue, setSearchValue] = useState(() => new URLSearchParams(location.search).get('query') || '')

  useEffect(() => {
    const searchTerm = searchValue.trim()
    if (!searchTerm) return undefined
    const timer = setTimeout(() => navigate(`/search?query=${encodeURIComponent(searchTerm)}&type=movie&page=1`), 400)
    return () => clearTimeout(timer)
  }, [navigate, searchValue])

  useEffect(() => {
    const handleProfileMenuDismiss = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsProfileOpen(false)
    }

    document.addEventListener('mousedown', handleProfileMenuDismiss)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleProfileMenuDismiss)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleSearchChange = (event) => setSearchValue(event.target.value)

  return <>
    <header className="site-header">
      <a className="brand" href="/" aria-label="TMDB home">TMDB<span /></a>
      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navigation.map((item) => <a href={`/${item.toLowerCase().replace(' ', '-')}`} key={item}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Add to list"><CirclePlus size={22} /></button>
        <button className="language-button" type="button">VI</button>
        <button className="icon-button notification-button" type="button" aria-label="Notifications"><Bell size={18} /></button>
        <div className="profile-menu" ref={profileMenuRef}>
          <button className="profile-button" type="button" aria-label="Open profile" aria-expanded={isProfileOpen} aria-controls="profile-dropdown" onClick={() => setIsProfileOpen(!isProfileOpen)}>N</button>
          {isProfileOpen && <div className="profile-dropdown" id="profile-dropdown" role="menu">
            <div className="profile-summary">
              <strong>NguyenHuy120304</strong>
              <a href="/profile">Xem hồ sơ</a>
            </div>
            <div className="profile-links">
              <a href="/discussions" role="menuitem">Thảo luận</a>
              <a href="/lists" role="menuitem">Danh sách</a>
              <a href="/ratings" role="menuitem">Đánh giá</a>
              <a href="/rankings" role="menuitem">Xếp hạng</a>
              <a href="/watchlist" role="menuitem">Danh sách theo dõi</a>
            </div>
            <div className="profile-links">
              <a href="/api" role="menuitem">API</a>
            </div>
            <div className="profile-links">
              <a href="/profile/edit" role="menuitem">Chỉnh sửa hồ sơ</a>
              <a href="/settings" role="menuitem">Cài đặt</a>
            </div>
            <div className="profile-links">
              <button type="button" role="menuitem" onClick={() => setIsProfileOpen(false)}>Đăng xuất</button>
            </div>
          </div>}
        </div>
        <button className="icon-button search-button" type="button" aria-label="Search"><Search size={23} /></button>
        <button className="mobile-menu" type="button" aria-label="Open menu" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={23} /></button>
      </div>
    </header>
    <div className="search-bar"><div className="page-width search-bar-inner"><Search size={18} aria-hidden="true" /><input value={searchValue} onChange={handleSearchChange} onKeyDown={(event) => event.key === 'Enter' && navigate(`/search?query=${encodeURIComponent(searchValue.trim())}&type=movie&page=1`)} aria-label="Search movies and TV shows" placeholder="Search for a movie, tv show..." /></div></div>
  </>
}

export default Header