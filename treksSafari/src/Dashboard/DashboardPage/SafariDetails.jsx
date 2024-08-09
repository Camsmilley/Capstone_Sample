import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Imported Icons
import { BsFillPersonCheckFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaBaby } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const SafariDetails = () => {
  const [singleSafari, setSingleSafari] = useState([]);

  // Lets get the id of this item
  const location = useLocation();
  const itemID = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchDetails = async () => {
      const results = await Axios.get(
        "http://localhost:3003/getSafariDetails/" + itemID
      );
      setSingleSafari(results.data);
    };
    fetchDetails();
  }, []);

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Upcoming Hiking</h1>
            <p>Available Hikes added by admin!</p>
          </div>
        </div>

        {singleSafari.map((safari) => (
          <div className="SafariDetails grid" key={safari.id}>
            <div className="imageDiv">
              <div className="imgText">
                <div className="stars flex">
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                </div>
                <h3>{safari.name}</h3>
              </div>
              {safari.image && <img src={`../../../imagesFolder/${safari.image}`} alt="Safari"/>}
            </div>
            <div className="detailsInfo">
              <span className="title">About this Item</span>
              <p>{safari.description}</p>
              <div className="specs grid">
                <span className="detailsDiv flex">
                  <AiOutlineFieldTime className="icon" />
                  <small className="infor">{safari.time}</small>
                </span>
                <span className="detailsDiv flex">
                  <BsFillPersonCheckFill className="icon" />
                  <small className="infor">Minimum of {safari.nop} guests</small>
                </span>
                <span className="detailsDiv flex">
                  <FaBaby className="icon" />
                  <small className="infor">{safari.childCat} Price: &#8369;{safari.childPrice} </small>
                </span>
              </div>

              <div className="actionButtons flex">
                <span className="price">&#8369;{safari.price}</span>
                <Link to={`/editSafari/${safari.id}`} className="btn buyBtn">
                  Edit TreksSafari
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafariDetails;
