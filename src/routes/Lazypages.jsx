import { lazy } from 'react'

export const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'))
export const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage.jsx'))
export const WatchlistPage = lazy(() => import('../pages/WatchlistPage/WatchlistPage.jsx'))
export const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage.jsx'))
export const UnderDevelopmentPage = lazy(() => import('../pages/UnderDevelopmentPage/UnderDevelopmentPage.jsx'))
