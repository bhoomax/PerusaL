import React from 'react';
import { Link } from 'react-router-dom';

// import "./Home.css";

import "./Home.css";

function Home() {
  return (
    <div style={styles.body}>
      <nav style={styles.nav}>
        <div style={styles.logo}>Perusal</div>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
          <li style={styles.navItem}><Link to="/login" style={styles.navLink}>Login</Link></li>
          <li style={styles.navItem}><Link to="/signup" style={styles.navLink}>Sign Up</Link></li>
        </ul>
      </nav>
      <div style={styles.landing}>
        <div style={styles.landingContainer}>
          <h1 style={styles.landingTitle}>Welcome to Perusal</h1>
          <p style={styles.landingText}>Connect with students from your university and showcase your skills.</p>
          <div style={styles.landingButtons}>
            <Link to="/login" style={{ ...styles.btn, ...styles.btnHover }}>Login</Link>
            <Link to="/signup" style={{ ...styles.btn, ...styles.btnHover }}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#121212',
    color: '#e0e0e0',
    margin: 0,
    padding: 0,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 0 20px rgba(187, 134, 252, 0.5)',
  },
  logo: {
    fontSize: '32px',
    fontWeight: 900,
    background: 'linear-gradient(90deg, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 10px rgba(187, 134, 252, 0.5)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    display: 'inline',
  },
  navLink: {
    textDecoration: 'none',
    color: '#e0e0e0',
    fontWeight: 700,
    transition: 'color 0.3s',
    position: 'relative',
  },
  landing: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(\'background.jpg\') no-repeat center center/cover',
  },
  landingContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '150px',
  },
  landingTitle: {
    fontSize: '90px',
    fontWeight: 900,
    marginBottom: '20px',
    background: 'linear-gradient(90deg, rgba(101,0,195,1) 0%, rgba(119,30,227,1) 23%, rgba(226,0,168,1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 10px rgba(187, 134, 252, 0.5)',
  },
  landingText: {
    fontSize: '18px',
    marginBottom: '40px',
    color: '#a1a1a1',
  },
  landingButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  btn: {
    display: 'inline-block',
    margin: '10px 5px',
    padding: '15px 30px',
    background: '#121212',
    color: '#e0e0e0',
    border: '2px solid',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 700,
    borderImage: 'linear-gradient(to right, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%)',
    borderImageSlice: 1,
    boxShadow: '0 0 20px rgba(187, 134, 252, 0.5)',
    transition: 'background 0.3s, box-shadow 0.3s',
  },
  btnHover: {
    background: 'linear-gradient(90deg, rgba(207,1,119,1) 0%, rgba(242,52,168,1) 23%, rgba(189,3,255,1) 100%)',
    boxShadow: '0 0 20px rgba(55, 0, 179, 0.5)',
  }
};

export default Home;