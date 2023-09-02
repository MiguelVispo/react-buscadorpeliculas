import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './Components/Movies'
import { useEffect, useState, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    // Para validar que es la primera vez que escribe en el input
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película sin nombre')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con esos caracteres')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // Esto funciona para que la generación de búsqueda no haga una búsqueda por cada letra que pongas en el buscador
  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    // Para crear un objecto para guardar todos los campos del formulario
    // const fields = Object.fromEntries(new window.FormData(event.target))
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>BUSCADOR DE PELÍCULAS</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading
            ? <p>Cargando...</p>
            : <Movies movies={movies} />
        }

      </main>
    </div>
  )
}

export default App
