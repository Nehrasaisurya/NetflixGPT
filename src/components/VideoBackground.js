import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-full h-screen">
      <iframe
        className="w-full h-full "
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&controls=0&loop=1"
        }
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
