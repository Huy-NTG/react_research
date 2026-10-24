import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import PageLoader from '../components/PageLoader/PageLoader'

import { HomePage, SearchPage, WatchlistPage, MovieDetailsPage, UnderDevelopmentPage } from './Lazypages'


function AppRouter() {

  return(
    <Suspense fallback={<PageLoader/>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<><Header /><SearchPage /><Footer /></>} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<UnderDevelopmentPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
