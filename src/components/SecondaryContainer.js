import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="px-8 py-4 -mt-56 z-20 relative">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRated} />
      <MovieList title={"Upcoming"} movies={movies.upComing} />
    </div>
  );
};

export default SecondaryContainer;
