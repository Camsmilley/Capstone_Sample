import React from "react";
import "./Dashboard.css";

//Imported icons
import { AiOutlinePlus } from "react-icons/ai";

const EditGuide = () => {
  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Edit Guide Page!</h1>
          <p>Edit this guide details</p>
        </div>

        <div className="formDiv grid">
          <div className="fieldDiv ">
            <label htmlFor="GuideName">Guide Full Name</label>
            <input type="text" id="GuideName" placeholder="Enter Guide Name" />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideTel">Guide Contact Number</label>
            <input
              type="number"
              id="GuideTel"
              placeholder="Enter guide phone number"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideTel">Account Password</label>
            <input
              type="password"
              id="GuideTel"
              placeholder="Enter Password"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideTel">Account Username</label>
            <input
              type="text"
              id="GuideTel"
              placeholder="Enter Username"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideTel">Guide Email</label>
            <input
              type="number"
              id="GuideTel"
              placeholder="Enter guide email"
            />
          </div>

          <button className="btn flex">
          Update Guide Details <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGuide;
