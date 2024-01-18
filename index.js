import e from "express";
import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import cors from "cors";
import signUp from "./users/signup.js";
import login from "./users/login.js";

const app = express();
const port = 8000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let howsAvailable;
const doctorData = [];

app.get("/", (req, res) => {
  res.json("Welcome to doctor available list");
});

app.post("/doctorAvailable", (req, res) => {
  howsAvailable = req.body;
  res.json({ message: "Data reveiced successfully", howsAvailable });
});

app.get("/doctorAvailable", (req, res) => {
  db.query(
    "SELECT * FROM doctors WHERE location = ?",
    [howsAvailable.location],
    (error, result) => {
      if (error) {
        console.error("Error selecting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(result);
      }
    }
  );
});
app.post("/api/data", (req, res) => {
  const data = req.body;
  const secureData = [
    data.UserName,
    data.DoctorEmail,
    data.DoctorPhone,
    data.location,
  ];
  db.query(
    "INSERT INTO doctors (name , email , phonenumber, location) VALUES (?,?,?,?)",
    secureData,
    (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Data received and inserted successfully!" });
      }
    }
  );

  // Close the MySQL connection when the server is stopped

  process.on("SIGINT", () => {
    connection.end((err) => {
      if (err) {
        console.error("Error closing MySQL connection:", err);
      }
      console.log("MySQL connection closed");
      process.exit();
    });
  });

  doctorData.push(secureData);
});

//signUp API Request...
app.post("/api/signUp",signUp);

//login API Request...
app.post("/api/login", login);

app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM doctors ", (error, result) => {
    if (error) {
      console.error("Error selecting data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.get("/doctors", (req, res) => {
  const dataDoctors = "SELECT * FROM doctors";

  db.query(dataDoctors, (err, data) => {
    try {
      res.json(data);
    } catch {
      res.json(err);
    }
  });
});

app.listen(port, () => {
  try {
    console.log("server is running in 8000 port");
  } catch {
    console.error(e);
  }
});
