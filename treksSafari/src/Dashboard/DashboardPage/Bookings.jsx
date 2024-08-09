import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Imported icons
import { TbListDetails } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  // const [safariName, setSafariName] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await Axios.get("http://localhost:3003/allBookings");
        setBookings(res.data.bookings);

        const getEmail = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      {bookings.map(guestBooking =>
        {
          const guestID = guestBooking.id
          const guestRole = guestBooking.role
          console.log(guestID)

          if( guestRole === getEmail.data.message){
            const getGuestBookings = async()=>{
              try{
                  const getBookings = await Axios.get('http://localhost:3003/getGuestBookings/'+ guestID)
                  setBookings(getBookings.data.bookings)
              }catch(err){
                console.log(err)
              }
            }
            getGuestBookings()
          }
          else if(guestRole !== getEmail.data.message){
            setBookings([]);
          }
          
          else{
            setBookings((prev)=>({...prev}));
          }
        }

      )}

        

       

        const safariNameID = res.data.bookings[0].safariID;
        const safariID = await Axios.get(
          "http://localhost:3003/getSafariName/" + safariNameID
        );
        // const safariName = safariID.data.safari[0].name;
      } catch (err) {
        console.log("Error occured");
      }
    };
    fetchBookings();
  }, []);

  // check if the user is authorized to see this page
  //  

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Hiking Bookings!</h1>
          <p>
            All hikes bookings, includes completed and the upcoming bookings!
          </p>
        </div>

        <div className="tableDiv">
          <table>
            <thead>
              <tr className="tableHeaders flex">
                <th>ID</th>
                <th>Guest Name</th>
                <th>Guest Email</th>
                <th>Number of P'l</th>
                <th>Safari Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr className="tableRows flex" key={booking.id}>
                  <td>0{booking.id}</td>
                  <td>{booking.guestname}</td>
                  <td>{booking.email}</td>
                  <td>{booking.nop}</td>
                  <td>{booking[1]}</td>
                  <td>{booking.safariname}</td>

                  <td>
                    <Link to={`/bookingDetails/${booking.id}`}>
                      <TbListDetails className="icon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
