import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Watchlater from "./Watchlater";
import PlayVideo from "./PlayVideo";

const Body = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/play" element={<PlayVideo />} />
          <Route path="/watchlater" element={<Watchlater />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
