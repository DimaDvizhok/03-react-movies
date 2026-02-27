import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieServices';
import { type Movie } from '../../types/movie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setSelectedMovie(null);
      setMovies([]);
      setIsError(false);
      setIsLoad(true);
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(data);
    } catch {
      toast.error('There was an error, please try again...');
      setIsError(true);
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
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={movie => setSelectedMovie(movie)}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
