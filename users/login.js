import db from "../db.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const data = req.body;
  // copmare passwords :
  db.query(
    "SELECT * FROM users WHERE userName =?",
    [data.userName],
    async (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (results.length > 0) {
          bcrypt.compare(
            data.Password,
            results[0].password,
            function (err, bcryptRes) {
              if (err) {
                return res.status(401).json({ message: "Invalid credentials" });
              } else if (bcryptRes) {
                return res.status(200).json({ message: "Login successful" });
              } else {
                // response is OutgoingMessage object that server response http request
                return res.status(401).json({ message: "Invalid credentials" });
              }
            }
          );
        } else {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }
    }
  );
};

export default login;
