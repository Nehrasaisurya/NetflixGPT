import React, { useRef, useState } from "react";
import Header from "./Header";
import { Validate } from "../util/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../util/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../util/userSlice";
import { USER_AVATAR } from "../util/constants";

const Login = () => {
  const [issigninForm, setisisgninForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = Validate(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message) return;
    if (!issigninForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const togglesigninform = () => {
    setisisgninForm(!issigninForm);
  };
  return (
    <div id="Login">
      <Header />
      <div className="flex items-center justify-center h-full overlay">
        <form
          className="p-16 flex justify-center w-full h-full md:h-fit flex-col md:w-[450px] rounded-md bg-black bg-opacity-80 z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-white text-4xl mb-6 font-bold">
            {issigninForm ? "Sign In" : "Sign Up"}
          </h1>
          {issigninForm ? (
            <input
              type="text"
              placeholder="Email or Phone number"
              className="p-4 my-2 w-full rounded-md text-[#b3b3b3] bg-[#333333] hidden"
            />
          ) : (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="p-4 my-2 w-full rounded-md text-[#b3b3b3] bg-[#333333]"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or Phone number"
            className="p-4 my-2 w-full rounded-md text-[#b3b3b3] bg-[#333333]"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 mb-5 w-full rounded-md bg-[#333333]"
          />
          <p className="text-red-500 font-bold text-lg text-center">
            {errorMessage}
          </p>
          <button
            className="p-4 my-2 w-full rounded-md mt-5 bg-red-600 text-white"
            onClick={handleButtonClick}
          >
            {issigninForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex justify-between items-center">
            <span>
              <input type="checkbox" id="check" />
              <label className="text-[#b3b3b3] ml-2 text-md" htmlFor="check">
                Remember me
              </label>
            </span>
            <span className="text-[#b3b3b3]">Need Help?</span>
          </div>
          <div className="my-10">
            <h1
              className="text-[#b3b3b3] text-xl mb-4"
              onClick={togglesigninform}
            >
              {issigninForm ? (
                <div className="">
                  New to Netflix ?
                  <span className="text-white cursor-pointer ml-2 hover:underline">
                    Sign Up now.
                  </span>
                </div>
              ) : (
                <div>
                  Alredy Have a account
                  <span className="text-white cursor-pointer ml-2 hover:underline">
                    Sign In now.
                  </span>
                </div>
              )}
            </h1>
            <h1 className="text-[#b3b3b3] text-sm">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <span className="text-blue-500">Learn more.</span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
