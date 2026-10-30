import { lazy } from 'react'

export const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'))
export const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage.jsx'))
export const WatchlistPage = lazy(() => import('../pages/WatchlistPage/WatchlistPage.jsx'))
export const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage.jsx'))
export const UnderDevelopmentPage = lazy(() => import('../pages/UnderDevelopmentPage/UnderDevelopmentPage.jsx'))

// //Test check bundle
// import HomePage from '../pages/HomePage/HomePage.jsx'
// import SearchPage from '../pages/SearchPage/SearchPage.jsx'
// import WatchlistPage from '../pages/WatchlistPage/WatchlistPage.jsx'
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage.jsx'
// import UnderDevelopmentPage from '../pages/UnderDevelopmentPage/UnderDevelopmentPage.jsx'

// export { HomePage, SearchPage, WatchlistPage, MovieDetailsPage, UnderDevelopmentPage }