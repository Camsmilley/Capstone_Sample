import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../../index.css";
import "./Signup.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const SignUp = () => {
  //   Declare state to hold and update the input values
  const [details, setDetails] = useState({
    guestEmail: "",
    guestPassword: "",
  });

  //  UseRef to capture role
  const guestRole = useRef();

  const getInputs = (e) => {
    const { value, name } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitValues = async (e) => {
    e.preventDefault();
    const setGuestRole = guestRole.current.value;

    const response = await Axios.post("http://localhost:3003/signUp", {
      setGuestRole,
      ...details,
    });
    console.log(response);
    window.location.href = "/login";
    alert("Signed up successfully");
  };

  return (
    <>
      <Header />
      <div className="container formContainer">
        <div className="formCard">
          <h3>SignUp Page</h3>
          <span>Create an account</span>

          <form action="">
            <div className="inputDiv">
              <label htmlFor="email">User Email</label>
              <input
                type="email"
                placeholder="Enter user email"
                id="email"
                name="guestEmail"
                onChange={getInputs}
              />
              <input type="hidden" name="role" ref={guestRole} value="guest" />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                name="guestPassword"
                onChange={getInputs}
              />
            </div>

            <button onClick={submitValues} className="btn">
              Sign Up
            </button>
          </form>

          <span className="signUpBtn">
            Have an account? <Link to={"/login"}>Login</Link>{" "}
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
