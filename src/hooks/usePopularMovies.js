import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies, setLoading } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS
        );
        const json = await data.json();
        dispatch(addPopularMovies(json.results));
        dispatch(setLoading());
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    if (!popularMovies || popularMovies.length === 0) {
      fetchPopularMovies();
    }
  }, [dispatch, popularMovies]);

  return popularMovies;
};

export default usePopularMovies;