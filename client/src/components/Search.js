import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./Search.css";


const Landing = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const searchBox = document.getElementById("searchBox");
      if (window.scrollY > 100) {
        searchBox.classList.add("show");
      } else {
        searchBox.classList.remove("show");
      }
    });
  }, []);

  async function searchUser() {
    try {
      const response = await fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchQuery }),
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result);
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function displayResults(users) {
    if (users.length > 0) {
      return users.map((user, index) => (
        <div className="result-item" key={index}>
          User: {user.username}
        </div>
      ));
    } else {
      return <p>No users found</p>;
    }
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <div className="logo">Perusal</div>
        <ul>
          <li>
            <a href="#landing">Home</a>
          </li>
          <li>
            <a href="#login">Login</a>
          </li>
          <li>
            <a href="#signup">Sign Up</a>
          </li>
        </ul>
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            id="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={searchUser}>
            🔍
          </button>
        </div>
      </nav>
      {/* Landing Page */}
      <section id="landing" className="parallax bg1">
        <div className="landing-container">
          <h1>Welcome to Perusal</h1>
          <p>Your gateway to endless knowledge</p>
          <div className="landing-buttons">
            <a href="#login" className="btn">
              Login
            </a>
            <a href="#signup" className="btn">
              Sign Up
            </a>
          </div>
        </div>
      </section>
      {/* Search Results Section */}
      <section id="search-results-container">
        <div id="search-results">{displayResults(searchResults)}</div>
      </section>
      {/* Parallax Section 1 */}
      <section className="parallax bg2"></section>
      {/* Parallax Section 2 */}
      <section className="parallax bg1"></section>
      {/* Footer */}
      <footer>
        <p>©️ 2024 Perusal. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Search;
