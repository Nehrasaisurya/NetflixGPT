import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    play: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    addUpComing: (state, action) => {
      state.upComing = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPlay: (state, action) => {
      state.play = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRated,
  addUpComing,
  addPlay,
} = movieSlice.actions;
