import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import { Link, useNavigate } from "react-router-dom";

// Imported Video
import Video from "../../assets/video1.mp4";

// Imported Icons
import { BsFillPersonCheckFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import Axios from "axios";

const Dashboard = () => {
  const [safaris, setSafaris] = useState([]);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // const [safariName, setSafariName] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await Axios.get("http://localhost:3003/threeBookings");
        setBookings(res.data.bookings);

        const safariNameID = res.data.bookings[0].safariID;
        const safariID = await Axios.get(
          "http://localhost:3003/getSafariName/" + safariNameID
        );
        // const safariName = safariID.data.safari[0].name;
      } catch (err) {Video
        console.log("Error occured");
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const getAllSafaris = async () => {
      const result = await Axios.get(
        "http://localhost:3003/allSafarisDashboard"
      );
      setSafaris(result.data);
    };
    getAllSafaris();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },

      });
      if (res.data.message === "guide") {
        navigate("/dashboard");

      }else if (res.data.message === "guest") {
        navigate("/dashboard");

      } else if (res.data.message === " ") {
        navigate("/login");
      }
    };

    getToken();
  }, []);

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="topSection">
          <div className="sectionTitle">
            <h1>Treks Safari Dashboard</h1>
            <p>This is where everything starts to happen!</p>
          </div>

          <div className="video_Summary">
            <div className="flexLeft flex">
              <div className="videoDiv">
                <video src={Video} autoPlay loop muted></video>
              </div>
              <div className="videoText">
                <h4>Looking an extraordinary service for the community!</h4>

                <div className="btns flex">
                  <Link to={""} className="link bg">
                    We based to serve
                  </Link>
                  <Link to={""} className="link ">
                    Love for the Hikes
                  </Link>
                </div>
              </div>
            </div>

            <div className="flexRight">
              <span>Upcoming Bookings</span>
              {bookings.map((booking) => (
                <div className="singleBooking" key={booking.id}>
                  <span>{booking.safariname}</span>
                  <div className="flex">
                    <small>{booking.nop} People</small>
                    <small>{booking.date} </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottomSection">
          <span className="title">Popular Tours</span>
          <div className="toursContainer flex">
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
                <div className="tourInfo">
                  <span className="tourTitle">{safari.name}</span>
                  <div className="detailsDiv flex">
                    <BsFillPersonCheckFill className="icon" />

                    <small className="infor">
                      Minimum of {safari.nop} guests
                    </small>
                  </div>

                  {/* <Link
                    to={`/bookingDetails/${safari.id}`}
                    className="btn flex"
                  >
                    View Details <AiOutlineSwapRight className="icon" />
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
