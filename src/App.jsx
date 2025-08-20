import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite';


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

export const App = () => {
  const [moviename, setmoviename] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);//For showing loader
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');



  useDebounce(() => {
    setDebouncedSearchTerm(moviename);
  }, 500, [moviename]);


  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies. Try again later.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {

      setErrorMessage("Failed to fetch movies. Try again later.");

    } finally {
      setLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

    } catch (error) {
      console.error(`Error fetching trending movies:${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);

  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
    <main className='scrollbar-hide min-h-screen bg-[#030013] w-full'>
      <div className='pattern flex items-center justify-center w-full '>
        <div className='Wrapper w-full'>
          <header className='w-full flex flex-col items-center justify-center px-3 py-4 bg-[url("./BG.png")] bg-no-repeat bg-cover bg-center'>
            <img className='w-[3rem] lg:w-[4rem] object-cover' src="./logo.png" alt="" />
            <img className='w-[75%] md:w-[50%] lg:w-[25%] object-cover' src="./hero-img.png" alt="" />
            <h1 className='font-bold lg:font-extrabold text-4xl md:text-5xl lg:text-6xl lg:w-1/3 tracking-tight leading-none text-center text-zinc-200'>Find <span className='highlight bg-clip-text text-transparent bg-gradient-to-l from-violet-600 via-violet-300 to-indigo-600 capitalize'>Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search moviename={moviename} setmoviename={setmoviename} />
          </header>

          <section className='trending w-full'>
            <h1 className='w-full mx-auto font-bold lg:font-extrabold text-2xl text-center md:text-3xl lg:text-4xl lg:w-1/3 tracking-tight leading-none text-zinc-200'>Trending Movies</h1>
            <ul className='overflow-x-auto flex items-center px-4 flex-nowrap justify-center gap-12 mt-6'>
              {trendingMovies.map((movie, index) => (
                <li className='relative flex items-center gap-2 flex-shrink-0' key={movie.$id}>
                  <p className='absolute text-[6rem] lg:text-[10rem] md:text-[7rem] font-bold text-transparent bg-clip-text bg-[#fdfdfd98] drop-shadow-sm drop-shadow-violet-600 left-[-1.5rem]'>{index + 1}</p>
                  <img className='w-25 md:w-40 lg:w-48 object-cover' src={movie.poster_url} alt="" />
                </li>
              ))}
            </ul>
          </section>

          <h1 className='mt-6 text-3xl font-extrabold text-zinc-200 px-20 text-center'>All Movies</h1>
          <section className='all-movies lg:w-[80%] mx-auto flex flex-wrap items-center justify-evenly gap-2 mt-8'>
            {loading ? <Spinner /> : errorMessage ? (
              <div>
                <p className='text-rose-500'>{errorMessage}</p>
              </div>
            ) : movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}
export default App
