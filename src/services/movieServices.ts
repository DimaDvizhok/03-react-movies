import { type Movie } from '../types/movie';
import axios from 'axios';

interface MoviesResponse {
  results: Movie[];
}
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  params: {
    query: 'movie',
    include_adult: false,
    language: 'en-US',
  },
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

export const fetchMovies = async () => {
  const response = await axios.get<MoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    options
  );
  return response.data;
};
