import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Imported Icons
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const bookingID = location.pathname.split("/")[2];

  useEffect(() => {
    const fecthDetails = async () => {
      await Axios.get("http://localhost:3003/singleBooking/" + bookingID).then(
        (res) => {
          setBookingDetails(res.data.booking);
        }
      );
    };
    fecthDetails();
  });

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/dashboard");
      } else if(res.data.message === "guide"){
        navigate('/dashboard')
      }
    };

    getToken();
  }, []);


  // Delete Booking Fucntionality
  const deleteBooking = () => {
    Axios.delete("http://localhost:3003/deleteBooking/" + bookingID);
    window.location.href = "/bookings";
  };

  // useEffect(() => {
  //   const getToken = async () => {
  //     const res = await Axios.get("http://localhost:3003/viewCheck", {
  //       headers: {
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //     });
  //     if (res.data.message === "no access") {
  //       navigate("/dashboard");
  //     }
  //   };

  //   getToken();
  // }, []);

  


  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Single Booking Details</h1>
            <p>Full details of the booking submitted by the guest!</p>
          </div>
        </div>

        <div className="detailContainer">
          <span className="topCard flex">
            <span>Dolphine Experience</span>
            <button onClick={deleteBooking} className="btn flex">
              Delete Booking <AiFillDelete className="icon" />
            </button>
          </span>

          {bookingDetails.map((booking) => {
            return (
              <div className="guestDetails grid" key={booking.id}>
                <div className="flex">
                  <span className="title">Guest Name</span>
                  <span>{booking.guestname}</span>
                </div>
                <div className="flex">
                  <span className="title">Nationlity</span>
                  <span>{booking.nationality}</span>
                </div>
                <div className="flex">
                  <span className="title">Phone</span>
                  <span>{booking.contact}</span>
                </div>
                <div className="flex">
                  <span className="title">Email</span>
                  <span>{booking.email}</span>
                </div>

                <div className="flex">
                  <span className="title">Arrival Date</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex">
                  <span className="title">Number of People</span>
                  <span>{booking.nop}</span>
                </div>

                <div className="flex">
                  <span className="title">Number of Chilren</span>
                  <span>{booking.noc}</span>
                </div>
                <div className="grid">
                  <span
                    className="title"
                    style={{
                      color: "#96654c",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Guest Message
                  </span>
                  <span className="title">{booking.message}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
