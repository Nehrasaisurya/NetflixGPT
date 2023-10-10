import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptmovies: null,
    movieNames: null,
    movieResults: null,
    loading: false,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    addLoadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default gptSlice.reducer;
export const { toggleGptSearchView, addGptMovieResult, addLoadingState } =
  gptSlice.actions;
