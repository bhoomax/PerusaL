import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const username  = cookies.username;
  console.log(username);
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/profile/${username}`);
        const result = await response.json();
        if (response.status !== 200) {
          alert(result.message);
        } else {
          setUserData(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [username]);

  return (
    <div>
      <nav style={styles.nav}>
        <div style={styles.logo}>Perusal</div>
        <ul style={styles.ul}>
          <li>
          <li><Link to="/main">Home</Link></li>
          </li>
          <li>
          <Link to="/add">Add Badge</Link>
          </li>
          <li><Link to="/home" onClick={() => {
        removeCookie("username");
        removeCookie("AuthToken");
        window.location.reload();
      }}>Logout</Link></li>
        </ul>
      </nav>
      <div style={styles.profileContainer}>
        {userData && (
          <>
            <div style={styles.profileHeader}>
              <h2 style={styles.h2}>{userData.user.username}</h2>
            </div>
            <div style={styles.profileDetails}>
              <p>
                <span>{userData.user.fname} </span>
                <span>{userData.user.lname}</span>
              </p>
              <p>
                <strong>Phone Number:</strong> {userData.user.phno}
              </p>
            </div>
            <div style={styles.badgeList}>
              <h3>Badges</h3>
              <ul style={styles.badgeUl}>
                {userData.badges.map((badge) => (
                  <li key={badge} style={styles.badgeLi}>
                    <div className={`badge-circle ${badge}`} style={styles.badgeCircle}></div>
                    <i className={badgeIcons[badge] || "fas fa-trophy"} style={styles.badgeIcon}></i>
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
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
    WebkitBackgroundClip: "text",
    background: "linear-gradient(90deg, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%)",
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
  profileContainer: {
    maxWidth: "600px",
    margin: "75px auto",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  h2: {
    marginBottom: "10px",
    fontSize: "35px",
    WebkitBackgroundClip: "text",
    background: "linear-gradient(90deg, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%)",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 10px rgba(187, 134, 252, 0.5)",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#bb86fc",
    color: "#121212",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  profileDetails: {
    marginTop: "20px",
  },
  badgeList: {
    marginTop: "20px",
  },
  badgeUl: {
    listStyleType: "none",
    padding: "0",
    display: "flex",
    flexWrap: "wrap",
  },
  badgeLi: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#2e2e2e",
    padding: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    borderRadius: "20px",
    fontSize: "16px",
  },
  badgeCircle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  badgeIcon: {
    marginRight: "10px",
    color: "#bb86fc",
  },
};

const badgeIcons = {
  aiml: "fab fa-react",
  appdev: "fas fa-mobile-alt",
  cybersec: "fas fa-shield-alt",
  devops: "fas fa-server",
  webdev: "fas fa-code",
};

export default Profile;
