import { Bell, CirclePlus, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import './Header.scss'

const navigation = ['Movies', 'TV Shows', 'People', 'Awards', 'More']

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        <button className="profile-button" type="button" aria-label="Open profile">N</button>
        <button className="icon-button search-button" type="button" aria-label="Search"><Search size={23} /></button>
        <button className="mobile-menu" type="button" aria-label="Open menu" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={23} /></button>
      </div>
    </header>
    <div className="search-bar"><div className="page-width search-bar-inner"><Search size={18} aria-hidden="true" /><input aria-label="Search movies, TV shows, and people" placeholder="Search for a movie, tv show, person..." /></div></div>
  </>
}

export default Header