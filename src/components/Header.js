import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../util/userSlice";
import { NETFLIX_LOGO } from "../util/constants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toggleGptSearchView } from "../util/gptSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdown, setdropdowm] = useState(false);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleDropdown = () => {
    setdropdowm(!dropdown);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const HandleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-[100%]  px-4 md:px-8 py-2 z-100 bg-gradient-to-b from-black z-10 flex items-center justify-between">
      <Link to="/browse">
        <img src={NETFLIX_LOGO} alt="logo" className="w-32 md:w-44" />
      </Link>
      {user && (
        <div className="flex items-center gap-6">
          <button
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-sm  text-white font-bold text-sm"
            onClick={HandleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <div className="flex cursor-pointer" onClick={handleDropdown}>
            <img src={user?.photoURL} className="w-9 rounded-sm" alt=".." />
            <button>
              <RiArrowDropDownLine className="text-white font-bold text-xl" />
            </button>
          </div>

          {dropdown && (
            <div className="absolute top-20 right-10 bg-black bg-opacity-80 px-10 pb-10 pt-16 clip rounded-md">
              <div className="flex items-center mb-5">
                <img
                  src={user?.photoURL}
                  className="w-10 rounded-sm mr-3"
                  alt=".."
                />
                <h1 className="text-white">{user?.displayName}</h1>
              </div>
              <h1 className="text-xl text-white">Manage Profiles</h1>
              <p className="text-white">-----------------------</p>
              <h1 className="text-white">Account</h1>
              <h1 className="text-white">Help Center</h1>
              <Link to="/watchlater">
                <button className="text-white font-bold mt-3">
                  My WatchLater
                </button>
              </Link>
              <center>
                <button
                  onClick={() => handleSignout()}
                  className=" text-white font-bold"
                >
                  Sign Out from Netflix
                </button>
              </center>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
