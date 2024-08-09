import React, { useRef, useState } from "react";
import "./Dashboard.css";

//Imported icons
import { AiOutlinePlus } from "react-icons/ai";
import Axios from "axios";

const AddGuide = () => {
  // State to store input values
  const [newGuide, setNewGuide] = useState({
    firstName: "",
    secName: "",
    guideContact: null,
    guideEmail: "",
    password: "",
    guideRole: "",
  });

  // UseRef to get the role Value
  const guideRole = useRef();

  //funtion to get form Inputs
  const getData = (e) => {
    const { name, value } = e.target;
    setNewGuide((prev) => ({ ...prev, [name]: value }));
    console.log(newGuide);
  };

  // funtion to send information to the server
  const addGuide = async (e) => {
    e.preventDefault();
    const currentGuideRole = guideRole.current.value;
    await Axios.post("http://localhost:3003/addGuide/", {currentGuideRole, ...newGuide} ).then(() => {
      console.log("Guide created successfully");
      window.location.href = "/guides";
    });
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Add New Guide!</h1>
          <p>Add new guide for the world!</p>
        </div>

        <div className="formDiv grid">
          <div className="fieldDiv ">
            <label htmlFor="fName">Guide First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={getData}
              id="fName"
              placeholder="Enter First Name"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="sName">Guide Second Name</label>
            <input
              type="text"
              name="secName"
              onChange={getData}
              id="sName"
              placeholder="Enter Second Name"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideTel">Guide Contact Number</label>
            <input
              type="number"
              name="guideContact"
              onChange={getData}
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
              onChange={getData}
              placeholder="Enter guide email"
            />

          </div>
          <div className="fieldDiv ">
            <label htmlFor="password">Guide Password</label>
            <input
              type="password"
              name="password"
              onChange={getData}
              id="password"
              placeholder="Enter guide password"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="GuideRole">Guide Role</label>
            <select ref={guideRole} onChange={getData}>
              <option value="guide">Guide</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button onClick={addGuide} className="btn flex">
            Add Guide <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGuide;
