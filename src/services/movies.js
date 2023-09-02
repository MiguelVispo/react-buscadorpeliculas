// https://www.omdbapi.com/?apikey={API KEY}={PALABRA A BUSCAR}

/* const API_KEY = 'cbffee9d'

const buscarPelicula = async ({ pelicula }) => {
  if (pelicula === '') return
  try {
    const respuesta = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${pelicula}`)

    const json = await respuesta.json()
    const peliculas = json.Search

    return peliculas?.map(pelicula => ({
      id: pelicula.imdbID,
      title: pelicula.Title,
      year: pelicula.Year,
      picture: pelicula.Poster
    }))
  } catch (error) {
    throw new Error('Error al buscar la pelicula')
  }
}

export default buscarPelicula */

const API_KEY = 'cbffee9d'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)

    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (error) {
    throw new Error('Error al buscar la pelicula')
  }
}
