import { ChevronLeft, ChevronRight } from 'lucide-react'
import './HeroBanner.scss'

function HeroBanner() {
  return <section className="hero-banner" aria-label="Featured title">
    <div className="page-width hero-content">
      <p className="eyebrow">THE MOVIE DATABASE</p>
      <h1>Welcome<span>.</span></h1>
      <p className="hero-copy">Millions of movies, TV shows and people to discover. Explore now.</p>
      <a className="hero-link" href="/movies">Explore the collection <ChevronRight size={16} /></a>
    </div>
    <div className="hero-controls page-width">
      <button type="button" aria-label="Previous featured title"><ChevronLeft size={17} /></button>
      <span><b />Silo</span><button type="button" aria-label="Next featured title"><ChevronRight size={17} /></button>
    </div>
  </section>
}

export default HeroBanner