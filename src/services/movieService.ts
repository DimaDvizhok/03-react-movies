import axios from 'axios';
import { type Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
}
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string) => {
  const options = {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  const response = await axios.get<MoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    options
  );
  return response.data.results;
};
