import { useEffect } from "react";
import { API_OPTIONS } from "../util/constants";
import { useDispatch } from "react-redux";
import { addUpComing } from "../util/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcoming = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpComing(json.results));
  };

  useEffect(() => {
    getUpcoming();
  }, []);
};

export default useUpcomingMovies;
