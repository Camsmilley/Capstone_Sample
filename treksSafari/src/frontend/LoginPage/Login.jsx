import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Login.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //Create state that hold values entered by the user
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const LoginUser = async (e) => {
    e.preventDefault();

    const response = await Axios.post("http://localhost:3003/loginUser", {
      userEmail: userEmail,
      password: userPassword,
    });

    // localStorage.setItem(userEmail)

    if (response.data.auth == true) {
      console.log('true')
      setLoginStatus(true);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      setLoginStatus(false);
      navigate("/login");
      alert("User name or passwords are incorrect");
    }
  };
  return (
    <>
      <Header />
      <div className="container formContainer">
        <div className="formCard">
          <h3>Login Page</h3>
          <span>Welcome Guest</span>

          <form action="">
            <div className="inputDiv">
              <label htmlFor="userEmail">User Email</label>
              <input
                type="email"
                placeholder="Enter user email"
                autoComplete="email"
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
              />
            </div>

            <button onClick={LoginUser} className="btn">
              Login
            </button>
          </form>

          <span className="signUpBtn">
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
