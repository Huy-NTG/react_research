import Header from './components/Header/Header'
import HeroBanner from './components/HeroBanner/HeroBanner'
import TrendingSection from './components/TrendingSection/TrendingSection'
import Footer from './components/Footer/Footer'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage'
import { Route, Routes } from 'react-router-dom'
import SearchPage from './pages/SearchPage/SearchPage'
import WatchlistPage from './pages/WatchlistPage/WatchlistPage'

function App() {
  return <Routes>
    <Route path="/search" element={<><Header /><SearchPage /><Footer /></>} />
    <Route path="/watchlist" element={<WatchlistPage />} />
    <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
    <Route path="*" element={<div className="app-shell">
      <Header />
      <main>
        <HeroBanner />
        <TrendingSection />
      </main>
      <Footer />
    </div>} />
  </Routes>
}

export default App