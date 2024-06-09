import React, { useState } from 'react';
import './Signup.css'; // Import CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    usn: '',
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(null);

  // Function to toggle password visibility
  const togglePasswordVisibility = (id) => {
    const field = document.getElementById(id);
    if (field.type === 'password') {
      field.type = 'text';
    } else {
      field.type = 'password';
    }
  };

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.status === 200) {
        console.log(result);
        // Handle successful signup, e.g., redirect to login page
        setCookie("username", data.username);
        setCookie("AuthToken", data.token);
        navigate('/main');
      } else {
        setError(result.message);
        console.log(result);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex-container">
      <h1>PERUSAL</h1>
      <div className="content-container">
        <div className="form-container">
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              required
              value={data.fname}
              onChange={(e) => setData({ ...data, fname: e.target.value })}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              required
              value={data.lname}
              onChange={(e) => setData({ ...data, lname: e.target.value })}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              type="text"
              name="usn"
              placeholder="USN"
              required
              value={data.usn}
              onChange={(e) => setData({ ...data, usn: e.target.value })}
            />
            <input
              type="text"
              name="phno"
              placeholder="Phone Number"
              required
              value={data.phno}
              onChange={(e) => setData({ ...data, phno: e.target.value })}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <span
              className="toggle-visibility"
              onClick={() => togglePasswordVisibility('password')}
            >
              Show/Hide Password
            </span>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
           {/* <Link to="/login"> <input type="submit" value="signup" className="submit-btn" />
             
            </Link> */}
            <Link to= "/login" className="submit-btn" onClick={handleSignup}>Sign Up</Link>

          </form>
          <div className="links">
            <Link to="/login" className="link">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;