import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, overview }) => {
  return (
    <div>
      <h1 className="text-3xl text-white font-bold mb-4 mt-10 px-4">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex items-center">
          {movies &&
            movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                voteavg={movie.vote_average}
                release={movie.release_date}
                overview={movie.overview}
                movie={movie}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
