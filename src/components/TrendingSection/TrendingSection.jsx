import { useState } from 'react'
import { useTrendingMovies } from '../../hooks/useTrendingMovies'
import MovieCard from '../MovieCard/MovieCard'
import TrailerSection from '../TrailerSection/TrailerSection'
import PopularSection from '../PopularSection/PopularSection'
import './TrendingSection.scss'

function TrendingSection() {
  const [period, setPeriod] = useState('Today')
  const { movies, isLoading } = useTrendingMovies(period)

  return <>
    <section className="trending page-width"><div className="section-heading"><div><p className="eyebrow">WHAT EVERYONE IS WATCHING</p><h2>Trending</h2></div><div className="period-switcher" role="group" aria-label="Trending period">{['Today', 'This Week'].map((item) => <button className={period === item ? 'active' : ''} key={item} type="button" onClick={() => setPeriod(item)}>{item}</button>)}</div></div><div className="movie-rail">{isLoading ? <p className="loading-state">Loading titles...</p> : movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}</div></section>
    <TrailerSection movies={movies} />
    <PopularSection />
  </>
}

export default TrendingSection