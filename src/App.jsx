import { Bell, ChevronLeft, ChevronRight, CirclePlus, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { useTrendingMovies } from './hooks/useTrendingMovies'
import PopularSection from './components/PopularSection'
import TrailerSection from './components/TrailerSection'
import './App.scss'

const navigation = ['Movies', 'TV Shows', 'People', 'Awards', 'More']

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
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
  )
}

function HeroBanner() {
  return <section className="hero-banner" aria-label="Featured title"><div className="page-width hero-content"><p className="eyebrow">THE MOVIE DATABASE</p><h1>Welcome<span>.</span></h1><p className="hero-copy">Millions of movies, TV shows and people to discover. Explore now.</p><a className="hero-link" href="/movies">Explore the collection <ChevronRight size={16} /></a></div><div className="hero-controls page-width"><button type="button" aria-label="Previous featured title"><ChevronLeft size={17} /></button><span><b />Silo</span><button type="button" aria-label="Next featured title"><ChevronRight size={17} /></button></div></section>
}

function MovieCard({ movie }) {
  return <a className="movie-card" href={`/movie/${movie.id}`}><div className="poster-wrap"><img src={movie.poster} alt={`${movie.title} poster`} /><span className="card-menu" aria-hidden="true">•••</span></div><h3>{movie.title}</h3><p>{movie.releaseDate} <span className="rating">★ {movie.rating?.toFixed(1)}</span></p></a>
}

function TrendingSection() {
  const [period, setPeriod] = useState('Today')
  const { movies, isLoading } = useTrendingMovies(period)
  return <><section className="trending page-width"><div className="section-heading"><div><p className="eyebrow">WHAT EVERYONE IS WATCHING</p><h2>Trending</h2></div><div className="period-switcher" role="group" aria-label="Trending period">{['Today', 'This Week'].map((item) => <button className={period === item ? 'active' : ''} key={item} type="button" onClick={() => setPeriod(item)}>{item}</button>)}</div></div><div className="movie-rail">{isLoading ? <p className="loading-state">Loading titles...</p> : movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}</div></section><TrailerSection movies={movies} /><PopularSection /></>
}

function App() {
  return <div className="app-shell"><Header /><main><HeroBanner /><TrendingSection /></main></div>
}

export default App