import { keepPreviousData, useQuery } from '@tanstack/react-query'

const imageBase = 'https://image.tmdb.org/t/p/w342'

async function fetchSearchResults({ queryKey }) {
  const [, type, searchTerm, page] = queryKey
  const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (!accessToken) throw new Error('TMDB access token is not configured.')

  const params = new URLSearchParams({ query: searchTerm, language: 'en-US', page: String(page), include_adult: 'false' })
  const response = await fetch(`https://api.themoviedb.org/3/search/${type}?${params}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error('Unable to load search results.')
  const data = await response.json()

  return {
    page: data.page,
    totalPages: Math.min(data.total_pages || 1, 500),
    totalResults: data.total_results || 0,
    results: (data.results || []).map((item) => ({
      id: item.id,
      title: type === 'movie' ? item.title : item.name,
      originalTitle: type === 'movie' ? item.original_title : item.original_name,
      date: type === 'movie' ? item.release_date : item.first_air_date,
      overview: item.overview,
      poster: item.poster_path ? `${imageBase}${item.poster_path}` : 'https://placehold.co/342x513/e1eaed/52717d?text=No+poster',
    })),
  }
}

export function useSearch(type, searchTerm, page) {
  const query = useQuery({
    queryKey: ['search', type, searchTerm, page],
    queryFn: fetchSearchResults,
    enabled: Boolean(searchTerm),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })

  return { ...query, data: query.data ?? { page: 1, totalPages: 1, totalResults: 0, results: [] } }
}
