import React, { useRef, useState } from "react";
import lang from "../util/languageConstants";
import openai from "../util/openai";
import { API_OPTIONS } from "../util/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../util/gptSlice";
import { addLoadingState } from "../util/gptSlice";
import { FiSearch } from "react-icons/fi";

const GptSearchBar = () => {
  const [language, setLanguage] = useState("English");
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    dispatch(addLoadingState(true));
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div>
      <div className="flex justify-center mt-16">
        <form
          className="m-6 flex justify-center items-center bg-white rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            placeholder={lang[language].gptSearchPlaceHolder}
            className="w-60 sm:w-96 px-6 border-none outline-none bg-transparent placeholder-font-bold"
          />
          <button
            className="py-4 px-6 bg-red-600 hover:bg-red-700 rounded-e-md text-white font-bold border-none outline-none"
            onClick={handleGptSearchClick}
          >
            <span className="flex md:hidden">
              <FiSearch />
            </span>
            <span className="hidden md:flex">{lang[language].search}</span>
          </button>
        </form>
      </div>
      <div className="flex justify-center gap-3">
        <p className="text-white opacity-50">Also available in:</p>
        {Object.keys(lang).map((key) => (
          <button
            key={key}
            className="text-white opacity-50"
            onClick={() => handleLanguageChange(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
