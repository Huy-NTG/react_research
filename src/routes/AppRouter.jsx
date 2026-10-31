import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import PageLoader from '../components/PageLoader/PageLoader'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import { HomePage, SearchPage, WatchlistPage, MovieDetailsPage, UnderDevelopmentPage } from './Lazypages'

function AppRouter() {
  return(
    <Suspense fallback={<PageLoader/>}>
      <Routes>
        <Route 
          path="/" 
          element={
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          } 
        />
        
        <Route 
          path="/search" 
          element={
            <ErrorBoundary>
              <>
                <Header />
                <SearchPage />
                <Footer />
              </>
            </ErrorBoundary>
          } 
        />

        <Route 
          path="/watchlist" 
          element={
            <ErrorBoundary>
              <WatchlistPage />
            </ErrorBoundary>
          } 
        />

        <Route 
          path="/movies/:movieId" 
          element={
            <ErrorBoundary>
              <MovieDetailsPage />
            </ErrorBoundary>
          } 
        />

        <Route path="*" element={<UnderDevelopmentPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter