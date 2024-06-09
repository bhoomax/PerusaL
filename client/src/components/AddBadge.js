import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

function AddBadge() {
  const [username, setUsername] = useState("");
  const [badge, setBadge] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const handleAddBadge = async (e) => {
    console.log(cookies);
    setUsername(cookies.username);
    console.log(username);
    e.preventDefault();
    console.log("Submitted!",badge);
    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, badge }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.flexContainer}>
      <nav style={styles.nav}>
        <div style={styles.logo}>Perusal</div>
        <ul style={styles.ul}>
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/profile/:username">Profile</Link></li>
          <li><Link to="/home" onClick={() => {
        removeCookie("username");
        removeCookie("AuthToken");
        window.location.reload();
      }}>Logout</Link></li>
        </ul>
      </nav>
      <div style={styles.container}>
        <h1 style={styles.h1}>Add Badge</h1>
        <form id="addBadgeForm" onSubmit={handleAddBadge} style={styles.form}>
          <label htmlFor="username" style={styles.label}>Username: {cookies.username}</label>
          <label htmlFor="badge" style={styles.label}>Badge:</label>
          <select
            id="badge"
            name="badge"
            required
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            style={styles.select}
          >
            <option value="aiml">AI/ML</option>
            <option value="appdev">App Development</option>
            <option value="cybersec">Cybersecurity</option>
            <option value="devops">DevOps</option>
            <option value="webdev">Web Development</option>
          </select>
          <input type="submit" value="Add Badge" style={styles.submitBtn} />
        </form>
      </div>
    </div>
  );
}

const styles = {
  flexContainer: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212",
    color: "#ffffff",
    margin: 0,
    padding: 0,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0 0 15px rgba(187, 134, 252, 0.5)",
  },
  logo: {
    fontSize: "32px",
    fontWeight: "900",
    background: "linear-gradient(90deg, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 10px rgba(187, 134, 252, 0.5)",
  },
  ul: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  a: {
    textDecoration: "none",
    color: "#e0e0e0",
    fontWeight: "700",
    transition: "color 0.3s",
  },
  container: {
    maxWidth: "600px",
    margin: "75px auto",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
  },
  h1: {
    textAlign: "center",
    color: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    color: "whitesmoke",
  },
  input: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid rgba(207,1,119,1)",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#121212",
    color: "#ffffff",
  },
  select: {
    marginBottom: "20px",
    padding: "2px",
    border: "1px solid rgba(207,1,119,1)",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#121212",
    color: "#ffffff",
  },
  submitBtn: {
    display: "inline-block",
    margin: "10px 5px",
    padding: "3px 3px",
    background: "#121212",
    color: "#e0e0e0",
    border: "2px solid",
    borderRadius: "10px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "700",
    borderImage: "linear-gradient(to right, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%) 1",
  },
};

export default AddBadge;
