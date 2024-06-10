import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import env from "dotenv";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import cors from "cors";
const port = 5000;
const app = express();
env.config();
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Perusal",
  password: process.env.PASSWORD,
  port: 5432,
});
db.connect();

// db.query("SELECT * FROM users",(err,res)=>{
//     if(err){
//         console.error("Error occured.",err.stack);
//     }
//     else{
//         console.log("User data:",res.rows);
//     }
//     db.end();
// });

// Signup
app.post("/signup", async (req, res) => {
  console.log(req.body.username)
  const username = req.body.username;
  const usn = req.body.usn;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phno = req.body.phno;
  const password = req.body.password;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE usn = $1", [
      usn,
    ]);
    if (checkResult.rows.length > 0) {
      res.status(400).send({ message: "Useralready exists. Try logging in." });
      return;
    } else {
      // Hashing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Some error occured. Try again." });
          return;
        } else {
          try {
            const result = await db.query(
              "INSERT INTO users (fname,lname,phno,usn,hash,username) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
              [fname, lname, phno, usn, hash, username]
            );
          } catch (err) {
            res.status(400).send({ message: "Username Taken." });
            return;
          }
          const token = jwt.sign({ username }, "secret", { expiresIn: "1hr" });
          res.status(200).json({ username, token });
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
});

//login
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password);
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.hash;
      bcrypt.compare(password, storedPassword, (err, result) => {
        if (err) {
          console.error(err);
        }
        if (result) {
          const token = jwt.sign({ username }, "secret", { expiresIn: "1hr" });

          res.status(200).send({ username, token });
        } else {
          res.status(400).send({ message: "Wrong password. Please try again." });
        }
      });
    } else {
      res.status(400).send({message:"User not found"});
    }
  } catch (err) {
    console.error(err);
  }
});
//search
/*In front-end, on adding multiple options it should render additionally. */
app.post("/search", async (req, res) => {
  const search = req.body.search;
  console.log(search);
  try {
    // Using a parameterized query to prevent SQL injection
    const checkResult = await db.query(
      `SELECT u.username FROM users u 
       JOIN ${db.escapeIdentifier(search)} d 
       ON u.userid = d.userid`
    );

    // Map the rows to extract usernames
    const usernames = checkResult.rows.map(row => row.username);

    // Respond with the array of usernames
    res.status(200).json(usernames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add badge
app.post("/add", async (req, res) => {
  const { badge, username } = req.body;

  try {
      const checkResult = await db.query(
          `SELECT userid FROM users WHERE username=$1`,
          [username]
      );

      if (checkResult.rows.length === 0) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      const userid = checkResult.rows[0].userid;

      const badgeCheckResult = await db.query(
          `SELECT userid FROM ${badge} WHERE userid=$1`,
          [userid]
      );

      if (badgeCheckResult.rows.length > 0) {
          res.status(400).json({ message: "Domain already chosen!" });
          return;
      }

      await db.query(
          `INSERT INTO ${badge} (userid) VALUES ($1) RETURNING *`,
          [userid]
      );

      res.status(200).json({ message: "Badge added successfully!", username, badge });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred." });
  }
});

// Get user profile
app.get("/profile/:username", async (req, res) => {
  const username = req.params.username;

  try {
      const userResult = await db.query("SELECT * FROM users WHERE username=$1", [username]);

      if (userResult.rows.length === 0) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      const user = userResult.rows[0];

      const badges = await Promise.all([
          db.query("SELECT * FROM aiml WHERE userid=$1", [user.userid]),
          db.query("SELECT * FROM appdev WHERE userid=$1", [user.userid]),
          db.query("SELECT * FROM cybersec WHERE userid=$1", [user.userid]),
          db.query("SELECT * FROM devops WHERE userid=$1", [user.userid]),
          db.query("SELECT * FROM webdev WHERE userid=$1", [user.userid]),
      ]);

      const badgeNames = ["aiml", "appdev", "cybersec", "devops", "webdev"];
      const userBadges = badges
          .map((badge, index) => (badge.rows.length > 0 ? badgeNames[index] : null))
          .filter((badge) => badge !== null);

      res.status(200).json({ user, badges: userBadges });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred." });
  }
});


app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
