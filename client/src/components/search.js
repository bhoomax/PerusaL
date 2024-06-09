import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./search.css";
import { Link } from 'react-router-dom';


const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showSearchResults,toggleSearchResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchBox = document.getElementById("searchBox");
      if (searchBox) {
        if (window.scrollY > 100) {
          searchBox.classList.add("show");
        } else {
          searchBox.classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function searchUser() {
    toggleSearchResults(true);
    if (searchQuery==""){
        toggleSearchResults(false);
        return;
    }
    console.log("Function called");
    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchQuery }),
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result);
        console.log(result);
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function displayResults(users) {
    console.log("function CALLED");
    console.log("Hereeee", users);
    if (Array.isArray(users) && users.length > 0) {
      return users.map((user, index) => (
        <div className="result-item" key={index}>
          User: {user}
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
  <Link to="/main">Home</Link>
</li>
<li>
  <Link to="/add">Add Badge</Link>
</li>
<li>
  <Link to="/home" onClick={() => {
        removeCookie("username");
        removeCookie("AuthToken");
        window.location.reload();
      }}>Logout</Link>
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
          <button className="search-button" id="searchBox" onClick={searchUser}>
            🔍
          </button>
        </div>
      </nav>
      {/* Search Results Section */}
      {showSearchResults &&
      <div><section id="search-results-container">
        <div id="search-results">{displayResults(searchResults)}</div>
      </section></div>}
      {/* Landing Page */}
      <section id="landing" className="parallax bg1">
        <div className="landing-container">
          <h1>Welcome to Perusal</h1>
          <p>Your gateway to endless knowledge</p>
          <div className="landing-buttons">
          <Link to="/add" className="btn">
  Add Badge
</Link>
<Link to="/profile/:username" className="btn">
  Profile
</Link>
          </div>
        </div>
      </section>
     
      {/* Footer */}
      <footer>
        <p>©️ 2024 Perusal. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
export default Search;