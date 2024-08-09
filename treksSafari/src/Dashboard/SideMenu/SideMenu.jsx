import React, { useEffect } from "react";
import "../SideMenu/SideMenu.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// Import Logo
import Logo from "../../assets/logo.png";

const SideMenu = () => {

  const navigate = useNavigate();

  // When you logout, check who you are and redirect to suitable login page.
  const logOut = () => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/login");
      } else {
        navigate("/staffLogin");
      }
    };

    getToken();
  };

  return (
    <div className="sideMenu grid">
      <div className="logoDiv">
        <Link to={"/dashboard"}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="menu ">
        <ul className="menuList grid">
          <li className="menuItem">
            <Link to={"/dashboard"} className="link">
              Dashboard
            </Link>
          </li>
          <li className="menuItem">
            <Link to={"/bookings"} className="link">
              Bookings
            </Link>
          </li>
          <li className="menuItem">
            <Link to={"toursPage"} className="link">
              Tours
            </Link>
          </li>
          {/* <li className="menuItem">
            <Link to={"/subscribers"} className="link">
              Subscribers
            </Link>
          </li> */}
          <li className="menuItem">
            <Link to={"/guides"} className="link">
              Guides
            </Link>
          </li>
          <li className="menuItem">
            <Link to={"/settings"} className="link">
              Settings
            </Link>
          </li>

          <li className="menuItem logOutBtn" onClick={logOut}>
            <span>Log Out</span>
          </li>
        </ul>
      </div>
      <div className="bottomCard">{/* Will put content here! */}</div>
    </div>
  );
};

export default SideMenu;
