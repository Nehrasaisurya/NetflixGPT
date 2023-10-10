import { useEffect } from "react";
import { API_OPTIONS } from "../util/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../util/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((r) => r.type === "Trailer");
    const Trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(Trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
