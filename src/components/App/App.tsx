import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieServices';
import { type Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoad(true);
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(data);
    } catch {
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#273b2c',
            color: '#e78888',
          },
        }}
      />
      <SearchBar onSubmit={handleSearch} />
      {isLoad && <Loader />}
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={() => toast.success('Movie selected!')}
        />
      )}
    </>
  );
}

export default App;
