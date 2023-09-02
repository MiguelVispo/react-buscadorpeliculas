import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  // Lo mismo que el usememo pero para funciones
  const getMovies = useCallback(
    async ({ search }) => {
      if (search === previousSearch.current) return
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }, [])

  // const getSortedMovies = () => {
  //   const sortedMovies = sort
  //   // localeCompare, compara y no distingue acentos, a = á (en ordenacion)
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies
  //   return sortedMovies
  // }

  const sortedMovies = useMemo(() => {
    // localeCompare, compara y no distingue acentos, a = á (en ordenacion)
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])
  return { movies: sortedMovies, getMovies, loading }
}
