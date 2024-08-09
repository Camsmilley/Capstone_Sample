import React, { useEffect, useState } from "react";
import "./Tour.css";
import { Link } from "react-router-dom";
import Axios from "axios";

// Imported Icons
import { BsFillPersonCheckFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AiOutlineSwapRight } from "react-icons/ai";

const Tour = () => {
  // State to hold data
  const [safaris, setSafari] = useState([]);

  // UseEffect to getData from the database through the server
  useEffect(() => {
    
    const getData = async () => {
      try{

        const results = await Axios.get("http://localhost:3003/allHomeSafaris");
        // console.log(results.data)
        setSafari(results.data);
      }catch(error){
        console.error(error)
      }
    };
    getData();
  }, []);

  return (
    <div className="tours container section">
      <div className="secContainer">
        <span className="secTitle">
          Available Hiking
          <p>Below are other trekssafari related to this!</p>
        </span>

        <div className="tourContainer grid">
          {safaris.map((safari) => (
            <div className="singleTour grid" key={safari.id}>
              <div className="imgDiv">
                {safari.image && (
                  <img
                    src={`../../../imagesFolder/${safari.image}`}
                    alt="Safari"
                  />
                )}
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="tourInfo"
              >
                <span className="tourTitle">{safari.name}</span>
                <div className="detailsDiv flex">
                  <BsFillPersonCheckFill className="icon" />

                  <small className="infor">
                    Minimum of {safari.nop} guests
                  </small>
                </div>
                <div className="detailsDiv flex">
                  <AiOutlineFieldTime className="icon" />

                  <small className="infor">{safari.time}</small>
                </div>

                <Link to={`/details/${safari.id}`} className="btn flex">
                  View Details <AiOutlineSwapRight className="icon" />
                </Link>
              </div>

              <span className="price">&#8369;{safari.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tour;
