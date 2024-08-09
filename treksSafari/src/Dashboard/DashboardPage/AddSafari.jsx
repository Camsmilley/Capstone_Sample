import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

//Imported icons
import { AiOutlinePlus } from "react-icons/ai";

const AddSafari = () => {
  //  Create a state that is gonna store our store and update the fields
  const [safariInfo, setSafariInfo] = useState({
    safariName: "",
    price: null,
    safariImage: null,
    duration: "",
    childCat: "",
    childPrice: null,
    totalGuests: null,
    desc: "",
  });

  const getData = (e) => {
    const { name, value } = e.target;

    //Check if the image entered by the user
    if (name === "safariImage") {
      setSafariInfo((prev) => ({ ...prev, safariImage: e.target.files[0] }));
    } else {
      setSafariInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const sendSafariInfor = async (e) => {
    e.preventDefault();

    // created a new instance of formData
    const formData = new FormData();
    formData.append("safariName", safariInfo.safariName);
    formData.append("price", safariInfo.price);
    formData.append("safariImage", safariInfo.safariImage);
    formData.append("duration", safariInfo.duration);
    formData.append("childCat", safariInfo.childCat);
    formData.append("childPrice", safariInfo.childPrice);
    formData.append("totalGuests", safariInfo.totalGuests);
    formData.append("desc", safariInfo.desc);

    await Axios.post("http://localhost:3003/addSafari", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    window.location.href = "/toursPage";
  };


   // check if the user is authorized to see this page
   useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/viewCheck", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "no access") {
        navigate("/dashboard");
      }
    };

    getToken();
  }, []);


  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Add New TreksSafari!</h1>
          <p>Add new experience for the world!</p>
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
                placeholder="Enter Safari Name"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="price">TreksSafari Price</label>
              <input
                type="number"
                name="price"
                onChange={getData}
                id="price"
                placeholder="Enter Safari Price"
              />
            </div>

            <div className="fieldDiv">
              <div className="fieldDiv">
                <label htmlFor="image">TreksSafari Image</label>
                <input
                  type="file"
                  name="safariImage"
                  onChange={getData}
                  id="image"
                />
              </div>
            </div>

            <div className="fieldDiv">
              <label htmlFor="time">TreksSafari Duration</label>
              <input
                type="text"
                name="duration"
                onChange={getData}
                id="time"
                placeholder="Enter Safari duration"
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
                name="desc"
                id="desc"
                onChange={getData}
                placeholder="Enter safari description"
              ></textarea>
            </div>

            <button onClick={sendSafariInfor} className="flex addSafariBtn">
              Add TreksSafari <AiOutlinePlus className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSafari;
