import React, { useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

//Imported icons
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const EditSafari = () => {
  const [safariData, setSafariData] = useState({
    safariName: "",
    price: null,
    image: null,
    time: "",
    childCat: "",
    childPrice: null,
    safDescription: "",
    totalGuests: null,
  });

  const getData = (e) => {
    const { name, value } = e.target;
    // statement to check if there's image set in the form and update safariData with image value separately
    if (name === "image") {
      setSafariData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setSafariData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(safariData);
  };

  // Get ID of the safari to update
  const location = useLocation();
  const safariID = location.pathname.split("/")[2];

  // Send Data to the server
  const sendInputs = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("safariName", safariData.safariName);
    formData.append("price", safariData.price);
    formData.append("image", safariData.image);
    formData.append("time", safariData.time);
    formData.append("childPrice", safariData.childPrice);
    formData.append("childCat", safariData.childCat);
    formData.append("safDescription", safariData.safDescription);
    formData.append("totalGuests", safariData.totalGuests);

    await Axios.put(
      "http://localhost:3003/updateSafari/"+ safariID,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    window.location.href = `/safariDetails/${safariID}`;
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Edit TrkesSafari!</h1>
          <p>Edit this TreksSafari!</p>
        </div>

        <form action="" encType="multipart/form-data">
          <div className="formDiv grid">
            <div className="fieldDiv ">
              <label htmlFor="safariName">TreksSafari Name</label>
              <input
                type="text"
                name="safariName"
                onChange={getData}
                id="safariName"
                placeholder="Enter TreksSafari Name"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="price">TreksSafari Price</label>
              <input
                type="number"
                name="price"
                onChange= {getData}
                id="price"
                placeholder="Enter TreksSafari Price"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="image">treksSafari Image</label>
              <input type="file" name="image" onChange={getData} id="image" />
            </div>

            <div className="fieldDiv">
              <label htmlFor="time">TreksSafari Timing</label>
              <input
                type="text"
                name="time"
                onChange={getData}
                id="time"
                placeholder="Enter TreksSafari timings"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="childCat">Children Category</label>
              <input
                type="text"
                name="childCat"
                onChange={getData}
                id="childCat"
                placeholder="Whats child category price?"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="childPrice">Children Price</label>
              <input
                type="number"
                name="childPrice"
                onChange={getData}
                id="childPrice"
                placeholder="Whats child category price?"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="totalGuests">Maximum Guests</label>
              <input
                type="number"
                name="totalGuests"
                onChange={getData}
                id="totalGuests"
                placeholder="Whats the max number of guests?"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="desc">TreksSafari Description</label>

              <textarea
                type="text"
                name="safDescription"
                id="desc"
                onChange={getData}
                placeholder="Enter trekssafari description"
              ></textarea>
            </div>

            <button onClick={sendInputs} className="flex addSafariBtn">
              Edit TreksSafari <AiOutlinePlus className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSafari;
