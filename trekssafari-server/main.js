const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { stringify } = require("querystring");
const { decode } = require("punycode");

app.use(cors());
app.use(express.json());
app.use(express.static("imagesFolder"));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "trekssafari",
});

// POST ROUTES //
// Route to insert a new user/guide data.
app.post("/addGuide", (req, res) => {
  // Valibles to hold data sent from the frontend
  const sentfirstName = req.body.firstName;
  const sentSecName = req.body.secName;
  const sentGuideEmail = req.body.guideEmail;
  const sentGuideContact = req.body.guideContact;
  const sentRole = req.body.currentGuideRole;
  const sentPassword = req.body.password;

  // SQL statement to insert details
  const sql =
    "INSERT INTO users (firstName, secName, contact, email, password, role) VALUES(?,?,?,?,?,?)";
  const Values = [
    sentfirstName,
    sentSecName,
    sentGuideContact,
    sentGuideEmail,
    sentPassword,
    sentRole
  ];

  // query to execute SQL statement
  db.query(sql, Values, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log("User inserted Success");
      res.send(rows);
    }
  });
});

//  Route to create a new safari booking ======= =============================>
app.post("/bookSafari", (req, res) => {
  const guestName = req.body.guestName;
  const nationality = req.body.nationality;
  const email = req.body.email;
  const noc = req.body.noc;
  const safariName = req.body.safariNameValue;
  const guestRole = req.body.guestRole;
  const contact = req.body.contact;
  const nop = req.body.nop;
  const arrivalDate = req.body.arrivalDate;
  const message = req.body.message;

  const Values = [
    guestName,
    nop,
    safariName,
    arrivalDate,
    nationality,
    contact,
    email,
    noc,
    message,
    guestRole
  ];


  // SQL to insert data
  const SQL =
    "INSERT INTO bookings (guestname, nop, safariname, date, nationality,contact, email, noc, message, role) VALUES (?,?,?,?,?,?,?,?,?,?)";
  // Execurte SQL
  db.query(SQL, Values, (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Route to check if the admin/user is autherized and login to the dashboard.
app.post("/loginUser", (req, res) => {
  const userEmailSent = req.body.userEmail;
  const userPasswordSent = req.body.password;

  const sql = "SELECT * from guests where email =? && password = ?";

  // var sql = "Select A.*, B.* from users A, guests B";

  const Values = [userEmailSent, userPasswordSent];

  db.query(sql, Values, (err, rows) => {
    if (err) {
      console.log("Error access the databasde");
      res.status(500).json({ message: "Error access the database" });
    }
    if (rows.length > 0) {
      const userID = rows[0].id;
      const userRole = rows[0].role;
      const userEmail = rows[0].email;

      const token = jwt.sign({ userID, userRole, userEmail }, "myToken", {
        expiresIn: "1d",
      });
      res.status(200).json({ auth: true, token, results: rows });
    } else {
      res.json({ auth: false, message: "No user found" });
    }
  });
});

// Route to check if the admin/user is autherized and login to the dashboard.
app.post("/loginStaff", (req, res) => {
  const userEmailSent = req.body.userEmail;
  const userPasswordSent = req.body.password;

  const sql = "SELECT * from users where email =? && password = ?";

  const Values = [userEmailSent, userPasswordSent];

  db.query(sql, Values, (err, rows) => {
    if (err) {
      console.log("Error access the databasde");
      res.status(500).json({ message: "Error access the database" });
    }
    if (rows.length > 0) {
      const userID = rows[0].id;
      const userRole = rows[0].role;

      const token = jwt.sign({ userID, userRole }, "myToken", {
        expiresIn: "1d",
      });
      res.status(200).json({ auth: true, token, results: rows });
    } else {
      res.json({ auth: false, message: "No user found" });
    }
  });
});

//  Route for guest Signup  ===================================>
app.post("/signUp", (req, res) => {
  const guestEmail = req.body.guestEmail;
  const guestPassword = req.body.guestPassword;
  const guestRole = req.body.setGuestRole;

  const Values = [guestEmail, guestPassword, guestRole];

  // SQL to insert data
  const SQL = "INSERT INTO guests (email, password, role) VALUES (?,?,?)";
  // Execurte SQL
  db.query(SQL, Values, (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Verifying a token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json("No token boss");
    res.redirect("/login");
  } else {
    jwt.verify(token, "myToken", (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }

      req.userID = decoded.userID;
      req.userRole = decoded.userRole; //please put the varianble you sent from the login route.
      req.userEmail = decoded.userEmail; //please put the varianble you sent from the login route.

      next();
    });
  }
};

app.get("/verifyUser", verifyToken, (req, res) => {
  if (req.id === "") {
    res.json({ message: "" });
    // } else if (req.userRole === "admin" || req.userRole === "guide") {
    //   res.json({ message: "generaluse" });
  } else if (req.userRole === "guest") {
    res.json({ message: "guest" });
  } else if (req.userRole === "admin") {
    res.json({ message: "admin" });
  } else if (req.userRole === "guide") {
    res.json({ message: "guide" });
  } else {
    res.status(403).send("You do not have permission to access this page.");
  }
});


app.get("/viewCheck", verifyToken, (req, res) => {
  if (req.userRole === "guide" || req.userRole === "guest") {
    res.json({ message: "no access" });
  } else {
    res.status(403).send("You do not have permission to access this page.");
  }
});

app.put("/updateMyDetails", verifyToken, (req, res) => {
  const myID = req.userID;

  const firstName = req.body.firstName;
  const secName = req.body.secName;
  const guideContact = req.body.guideContact;
  const guideEmail = req.body.guideEmail;
  const password = req.body.password;

  // SQL update the user details where the Id is equal to this myID
  const SQL =
    "UPDATE users SET `firstName`=?, `secName`=?, `contact`=?,   `email`=?, `password`=? WHERE id = ?";
  const Values = [firstName, secName, guideContact, guideEmail, password];


  db.query(SQL, [...Values, myID], (err, rows) => {
    if (err) {
      res.json("Error encountered");
    } else {
      res.json({ message: "successful" });
    }
  });
});

// Get guest all guestBookings
app.get("/guestBookings", verifyToken, (req, res) => {
  const guestEmail = req.userEmail;

  //Sql statement to select items from the database
  const SQL = "SELECT * FROM bookings WHERE email = ?";

  // Statement to run SQL query
  db.query(SQL, guestEmail, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some bookings", bookings: rows });
    } else {
      res.status(200).json([], { message: "No bookings found!" });
      console.log("No bookings found");
    }
  });
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/imagesFolder");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadImage = multer({ storage: imageStorage });

// Route to create a new tour/safari in the database
app.post("/addSafari", uploadImage.single("safariImage"), (req, res) => {
  const safariName = req.body.safariName;
  const price = req.body.price;
  const desc = req.body.desc;
  const duration = req.body.duration;
  const childCat = req.body.childCat;
  const totalGuests = req.body.totalGuests;
  const childPrice = req.body.childPrice;
  const safariImage = req.file;

  // SQL statement to add data from the frontend
  const SQL =
    "INSERT INTO tours (name, price, image, time, nop, childCat, description, childPrice) VALUES (?,?,?,?,?,?,?,?)";
  const Values = [
    safariName,
    price,
    safariImage.filename,
    duration,
    totalGuests,
    childCat,
    desc,
    childPrice,
  ];

  // Query tp run the SQL Statement
  db.query(SQL, Values, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

// Route to  fetch all Bookings from the database
app.get("/allBookings", (req, res) => {
  //Sql statement to select items from the database
  const SQL = "SELECT * FROM bookings";

  // Statement to run SQL query
  db.query(SQL, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some bookings", bookings: rows });
    } else {
      res.status(200).json([]);
    }
  });
});


// Route to  fetch all guest Bookings from the database
app.get("/getGuestBookings/:id", (req, res) => {
  const guestID = req.params.id
  //Sql statement to select items from the database
  const SQL = "SELECT * FROM bookings where id = ?";

  // Statement to run SQL query
  db.query(SQL, guestID,  (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some bookings", bookings: rows });
    } else {
      res.status(200).json([]);
    }
  });
});


// Route to fetch three Bookings from the database
app.get("/threeBookings", (req, res) => {
  //Sql statement to select items from the database
  const SQL = "SELECT * FROM bookings limit 3";

  // Statement to run SQL query
  db.query(SQL, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some bookings", bookings: rows });
    } else {
      res.status(200).json([]);
    }
  });
});

// Route to fetch Bookings from the database where ID is specified
app.get("/singleBooking/:id", (req, res) => {
  //Sql statement to select items from the database
  const singleBookingID = req.params.id;
  const SQL = "SELECT * FROM bookings WHERE id =?";

  // Statement to run SQL query
  db.query(SQL, singleBookingID, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res.status(200).json({ message: "We found the booking", booking: rows });
    } else {
      res.status(200).json([]);
    }
  });
});

// Route to fetch safariDetails from the database where ID is specified
app.get("/getSafariDetails/:id", (req, res) => {
  //Specify the item ID
  const itemID = req.params.id;
  const sql = "SELECT * FROM tours WHERE id = ?";
  // run the sql statement
  db.query(sql, itemID, (err, details) => {
    if (err) return res.json(err);
    return res.json(details);
  });
});

// Route to fetch Safaris from the database
app.get("/allSafaris", (req, res) => {
  const sql = "SELECT * FROM tours";
  db.query(sql, (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Route to fetch Safaris (Home Page) from the database
app.get("/allHomeSafaris", (req, res) => {
  const sql = "SELECT * FROM tours ORDER BY RAND() LIMIT 6";
  db.query(sql, (err, rows) => {
    if (err) return res.json(err);
    if (rows.length > 0) {
      return res.json(rows);
    } else {
      return res.json([]);
    }
  });
});

// Route to fetch Safaris (Admin Dashboard Page) from the database
app.get("/allSafarisDashboard", (req, res) => {
  const sql = "SELECT * FROM tours ORDER BY RAND() LIMIT 4";
  db.query(sql, (err, rows) => {
    if (err) return res.json(err);

    if (rows.length > 0) {
      return res.json(rows);
    } else {
      return res.json([]);
    }
  });
});

// Route to fetch Bookings from the database
app.get("/getSafariName/:id", (req, res) => {
  //Sql statement to select items from the database
  const SQL = "SELECT * FROM tours WHERE id = ?";
  const safariID = req.params.id;

  // Statement to run SQL query
  db.query(SQL, safariID, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res.status(200).json({ message: "We found it", safari: rows });
    } else {
      res.status(200).json([]);
    }
  });
});

// Route to get all Guides stored in the Database
app.get("/getGuides", (req, res) => {
  // SQL statement
  const sql = "SELECT * FROM users WHERE role = ?";
  const role = ["guide"];
  // Query to run the sql statement
  db.query(sql, role, (err, rows) => {
    if (err) {
      res.json(err);
    }
    if (rows.length > 0) {
      res.json({ rows: rows });
    } else {
      res.json({ rows: "No guide found in the database!" });
    }
  });
});

// UPDATE OPERATIONS ===============================>

// lets allocate the folder to be uploaded

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/imagesFolder");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.put("/updateSafari/:id", upload.single("image"), (req, res) => {
  const safariID = req.params.id;

  // All data sent from the frontend
  const safariName = req.body.safariName;
  const price = req.body.price;
  const safDescription = req.body.safDescription;
  const time = req.body.time;
  const childCat = req.body.childCat;
  const childPrice = req.body.childPrice;
  const totalGuests = req.body.totalGuests;
  const image = req.file;

  // sql to update safari
  const sql =
    "UPDATE tours SET `name`=?, `price`=?, `image`=?, `time`=?, `childCat`=?, `description`=?, `nop`=?, `childPrice`=? WHERE id =?";

  const Values = [
    safariName,
    price,
    image.filename,
    time,
    childCat,
    safDescription,
    childPrice,
    totalGuests,
  ];

  // Statement to execute SQL
  db.query(sql, [...Values, safariID], (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// DELETE OPERATIONS ===============================>
// Delete Safari
app.delete("/deleteSafari/:id", (req, res) => {
  const safariID = req.params.id;

  // sql to delete
  const sql = "DELETE FROM tours where id = ?";
  // run sql statement
  db.query(sql, safariID, (err, rows) => {
    if (err) return res.json(err);
    return res.json("Safari Delete Successfully!");
  });
});

const verifyDelete = (req, res, next) => {
  const deleteToken = req.headers["delete-access-token"];
  if (!deleteToken) {
    res.json("No token bro");
  } else {
    jwt.verify(token, "myToken", (err, decode) => {
      if (err) {
        res.json("need to verify token");
      }
      req.deletePermission = decode.userRole;
      if (req.deletePermission === "admin") {
        next();
      }
    });
  }
};

// Delete Booking
app.delete("/deleteBooking/:id", (req, res) => {
  const bookingID = req.params.id;

  // SQL statement
  const sql = "DELETE from bookings WHERE id = ?";
  // Qyeury the run sql statment
  db.query(sql, bookingID, (err, row) => {
    if (err) return res.json(err);
    return res.json(row);
  });
});

// Delete Booking
app.delete("/deleteGuide/:id", (req, res) => {
  const guideId = req.params.id;
  //sql statement to delete the guide
  const sql = "DELETE from users WHERE id = ?";
  // Query to execute the sql statement
  db.query(sql, guideId, (err, rows) => {
    if (err) return res.json(err);
    return res.json("Guide deleted successfully!");
  });
});

app.listen(3003, () => {
  console.log("Server is running!");
});
