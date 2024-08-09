import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Imported icons
import { BiEdit } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Guides = () => {
  // State to store all the users from the database
  const [guides, setGuides] = useState([]);
  // Form ID that will increment
  let ID = 1;
  const navigate = useNavigate();

  // Function to connect to the server and get all the guides
  useEffect(() => {
    const getGuides = async () => {
      try {
        const res = await Axios.get("http://localhost:3003/getGuides");
        setGuides(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    getGuides();
  }, []);

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
  //       alert("You dont have permission to operate on this page!");
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
      }
      else if(res.data.message === "guide"){
        navigate('/dashboard')
      }
    };

    getToken();
  }, []);

  // function to delete  Guide
  const deleteGuide = async (id) => {
    try {
      await Axios.delete("http://localhost:3003/deleteGuide/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>TreksSafari Guides!</h1>
            <p>All verified guides!</p>
          </div>

          <Link to={"/addGuide"} className="btn flex">
            Add Guide <AiOutlinePlus className="icon" />
          </Link>
        </div>

        <div className="tableDiv">
          <table>
            <tr className="tableHeaders flex">
              <th>ID</th>
              <th>Guide Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>

            <tbody>
              {guides.map((guide) => (
                <tr className="tableRows flex" key={guide.id}>
                  <td>{ID++}</td>
                  <td>{guide.firstName}</td>
                  <td>{guide.contact}</td>
                  <td>{guide.email}</td>
                  <td>
                    <Link to={`/editGuide/${guide.id}`} className="icon">
                      <BiEdit />
                    </Link>
                    <MdOutlineDeleteOutline
                      className="icon"
                      onClick={() => {
                        deleteGuide(guide.id);
                      }}
                    />
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

export default Guides;
