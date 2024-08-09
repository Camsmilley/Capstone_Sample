import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Imported Images

// Imported Icons
import { AiOutlineSwapRight } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const ToursPage = () => {
  const [safaris, setSafaris] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllSafaris = async () => {
      const result = await Axios.get("http://localhost:3003/allSafaris");
      setSafaris(result.data);
    };
    getAllSafaris();
  }, []);

  const deleteSafari = async (id) => {
    try {
      await Axios.delete("http://localhost:3003/deleteSafari/" + id, {
        headers: {
          "delete-access-token": localStorage.getItem("token"),
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // check if the user is authorized to see this page
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

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Upcoming Hikes</h1>
            <p>Available Hikes added by admin!</p>
          </div>
          <Link to={"/addSafari"} className="btn flex">
            Add Treks Safari <AiOutlinePlus className="icon" />
          </Link>
        </div>

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
              <div className="tourInfo">
                <span className="tourTitle">{safari.name}</span>

                <div className="btns flex">
                  <Link to={`/safariDetails/${safari.id}`} className="btn flex">
                    View Details <AiOutlineSwapRight className="icon" />
                  </Link>
                  <button
                    onClick={() => deleteSafari(safari.id)}
                    className="btn flex"
                  >
                    Delete Item <AiFillDelete className="icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
