import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Details.css";
import "../HomePage/Tours/Tour.css";
import Axios from "axios";

// Imported Icons
import { BsFillPersonCheckFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaBaby } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Tour from "../HomePage/Tours/Tour";
import { useLocation } from "react-router-dom";

const Details = () => {
  // State to hold data
  const [safariDetails, setsafariDetails] = useState([]);
  const [inputs, setInputs] = useState({
    guestName: "",
    nationality: "",
    email: "",
    noc: null,
    safariName: "",
    contact: null,
    nop: null,
    arrivalDate: "",
    price: null,
    childPrice: null,
    message: "",
  });

  //Get Safari ID
  const location = useLocation();
  const safariID = location.pathname.split("/")[2];

  // useEffect to fecth Data
  useEffect(() => {
    const fetchDetails = async () => {
      const results = await Axios.get(
        "http://localhost:3003/getSafariDetails/" + safariID
      );
      setsafariDetails(results.data);
    };
    fetchDetails();
  }, []);

  // Funftion to get data from the form
  const getData = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Use useRef to get the values without onChange fuction
  const safariNameRef = useRef();
  const roleRef = useRef();

  // Fuction to send data to the server
  const bookSafari = async (e) => {
    e.preventDefault();
    const safariNameValue = safariNameRef.current.value;
    const guestRole = roleRef.current.value;

    try {
      await Axios.post("http://localhost:3003/bookSafari", {
        safariNameValue, guestRole,
        ...inputs,
      }).then(() => {
        window.location.reload();
      });
    } catch (err) {
      console.log("error bro" + err);
    }
  };

  // const getTotalPrice = () => {
  //   const price = safariDetails[0].price;
  //   console.log(price);
  //   if (inputs.noc > 0) {
  //     const totalPrice = price + 2;
  //     setInputs((prev)=> ({...prev, price:totalPrice}));
  //     console.log(setInputs)
  //   }
  // };

  return (
    <>
      <Header />
      {safariDetails.map((safariDetail) => (
        <div className="detailsPage grid container" key={safariDetail.id}>
          <div className="imageDiv">
            <div className="imgText">
              <div className="stars flex">
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
              </div>
              <h3>{safariDetail.name}</h3>
            </div>
            {safariDetail.image && (
              <img
                src={`../../../imagesFolder/${safariDetail.image}`}
                alt="Safari"
              />
            )}
          </div>
          <div className="detailsInfo">
            <span className="title">About this Item</span>
            <p>{safariDetail.description}</p>
            <div className="specs grid">
              <span className="detailsDiv flex">
                <AiOutlineFieldTime className="icon" />
                <small className="infor">{safariDetail.time}</small>
              </span>
              <span className="detailsDiv flex">
                <BsFillPersonCheckFill className="icon" />
                <small className="infor">
                  Minimum of {safariDetail.nop} guests
                </small>
              </span>
              <span className="detailsDiv flex">
                <FaBaby className="icon" />
                <small className="infor">
                  {safariDetail.childCat}, price: &#8369;{safariDetail.childPrice}
                </small>
              </span>
            </div>

            <div className="actionButtons flex">
              <span className="price">&#8369;{safariDetail.price}</span>
            </div>

            <div className="bookingForm">
              <span className="title">Booking Form</span>
              <p>
                If you would like to be part of this amazing TreksSafari, please fill
                up this form!
              </p>

              {/* Booking Form */}

              <div className="gridContainer grid">
                <div className="inputDiv">
                  <label htmlFor="safariname">TreksSafari Name</label>
                  <input
                    type="text"
                    id="safariname"
                    name="safariname"
                    ref={safariNameRef}
                    onChange={getData}
                    value={safariDetail.name}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="role"
                    ref={roleRef}
                    onChange={getData}
                    value="guest"
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="safariPrice"
                    onChange={getData}
                    value={safariDetail.price}
                  />
                  <input
                    type="hidden"
                    name="childPrice"
                    onChange={getData}
                    value={safariDetail.childPrice}
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="name">Guest Name</label>
                  <input
                    type="text"
                    id="name"
                    name="guestName"
                    onChange={getData}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="Nationality">Nationality</label>
                  <input
                    type="text"
                    id="Nationality"
                    name="nationality"
                    onChange={getData}
                    placeholder="Enter your nationality"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="number">Guest Contact</label>
                  <input
                    type="number"
                    id="number"
                    name="contact"
                    onChange={getData}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="email">Guest Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={getData}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="nop">Number of people</label>
                  <input
                    type="number"
                    id="nop"
                    name="nop"
                    onChange={getData}
                    placeholder="Enter number of people"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="noc">Number of Children</label>
                  <input
                    type="number"
                    id="noc"
                    name="noc"
                    onChange={getData}
                    placeholder="Number of Children"
                  />
                </div>

                <div className="inputDiv">
                  <label htmlFor="time">Arrival Date & Time</label>
                  <input
                    type="datetime-local"
                    id="time"
                    name="arrivalDate"
                    onChange={getData}
                  />
                </div>

                <div className="inputDiv">
                  <label htmlFor="message">Guest Message</label>
                  <textarea
                    name="message"
                    onChange={getData}
                    id="message"
                    placeholder="Enter an message we need to know"
                  ></textarea>
                </div>

                <button onClick={bookSafari} className="btn">
                  Book TreksSafari
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Tour />
      <Footer />
    </>
  );
};

export default Details;
