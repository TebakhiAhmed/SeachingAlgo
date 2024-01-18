import db from '../db.js'
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const data = req.body;
  const saltRound = 10;
  const hashPassword = await bcrypt
    .hash(data.password, saltRound)
    .then(function (hash) {
      return hash;
    });
  const secureData = [data.userName, data.Email, hashPassword];
  db.query(
    "INSERT INTO users (userName , email , password ) VALUES (?,?,?)",
    secureData,
    (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log(results);
        res.json({ message: "Data received and inserted successfully!" });
      }
    }
  );
};

export default signUp;
