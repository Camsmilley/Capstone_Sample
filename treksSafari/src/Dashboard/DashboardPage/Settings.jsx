import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";
import {useNavigate}  from 'react-router-dom'

//Imported icons
import { AiOutlinePlus } from "react-icons/ai";

const Settings = () => {

  const navigate = useNavigate();

  const [newDetails, setNewDetails] = useState({
    firstName: "",
    secName: "",
    guideContact: null,
    guideEmail: "",
    password: "",
  });

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/settings");
      }
    };

    getToken();
  }, []);

  // Function to get all input by the user
  const getInput = (e) => {
    const { value, name } = e.target;
    setNewDetails((prev) => ({ ...prev, [name]: value }));
  };

  // funtion to send the details/Inputs to the server
  const updateMyDetails = async (e) => {
    e.preventDefault();
    const response = await Axios.put(
      "http://localhost:3003/updateMyDetails/",
      newDetails,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    if (response.data.message === "successful") {
      navigate("/login");
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Settings Page</h1>
          <p>Edit your information through the fields below!</p>
        </div>

        <div className="formDiv grid">
          <div className="fieldDiv ">
            <label htmlFor="fName">Guide First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={getInput}
              id="fName"
              placeholder="Enter First Name"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="sName">Guide Second Name</label>
            <input
              type="text"
              name="secName"
              onChange={getInput}
              id="sName"
              placeholder="Enter Second Name"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideTel">Guide Contact Number</label>
            <input
              type="number"
              name="guideContact"
              onChange={getInput}
              id="GuideTel"
              placeholder="Enter guide phone number"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideEmail">Guide Email</label>
            <input
              type="email"
              id="GuideEmail"
              name="guideEmail"
              onChange={getInput}
              placeholder="Enter guide email"
            />

            {/* <input
              type="hidden"
              id="GuideRole"
              name="guideRole"
              ref={guideRole}
              value={"guide"}
            /> */}
          </div>
          <div className="fieldDiv ">
            <label htmlFor="password">Guide Password</label>
            <input
              type="text"
              name="password"
              onChange={getInput}
              id="password"
              placeholder="Enter guide password"
            />
          </div>

          <button onClick={updateMyDetails} className="btn flex">
            Update details <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
