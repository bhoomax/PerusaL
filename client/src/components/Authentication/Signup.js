// import React, { Fragment, useState } from "react";
// import Home from "../Home";
// import { useEffect } from "react";
// import ReactDOM from "react";
// import { useCookies } from "react-cookie";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
// } from "mdb-react-ui-kit";


// function Signup(params) {
//   const [cookies, setCookie, removeCookie] = useCookies(null);
//   const [Data, setData] = useState({});
//   const [Error, setError] = useState(null);
//   console.log(cookies);
//   async function handleSignup(e) {
//     e.preventDefault();
//     try {
//       const body = Data;
//       console.log(Data);
//       const response = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       if (response.status == 200 && response.ok) {
//         const data = await response.json();
//         setCookie("username", data.username);
//         setCookie("AuthToken", data.token);
//         setError(null);
//         window.location.reload();
//       } else if (response.status == 400) {
//         setError("Username already in use, try logging in");
//         console.log(Error);
//       } else if (response.status == 488) {
//         setError("Enter all field data properly");
//         console.log(Error);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <div>
//       <MDBContainer>
//         <MDBRow className="d-flex justify-content-center align-items-center h-100">
//           <MDBCol col="12">
//             <MDBCard
//               className="text-white my-5 mx-auto"
//               style={{ borderRadius: "1rem", maxWidth: "400px", backgroundColor: "rgba(0 0 0/50%)"}}
//             >
//               <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
//                 <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
//                 <p className="text-white-50 mb-5">Join for all the fun!</p>

//                 <MDBInput style={{ color:"white"}}
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Username"
//                   id="username"
//                   type="text"
//                   size="lg"
//                   value={Data.Username}
//                             onChange={(e) => {
//                               setData({
//                                 ...Data,
//                                 username: e.target.value,
//                               });
//                             }}
//                 />
//                 <MDBInput style={{ color:"white"}}
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="First Name"
//                   id="fname"
//                   type="text"
//                   size="lg"
//                   value={Data.fname}
//                             onChange={(e) => {
//                               setData({
//                                 ...Data,
//                                 fname: e.target.value,
//                               });
//                             }}
//                 />
//                 <MDBInput style={{ color:"white"}}
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Last Name"
//                   id="lname"
//                   type="text"
//                   size="lg"
//                   value={Data.lname}
//                             onChange={(e) => {
//                               setData({
//                                 ...Data,
//                                 lname: e.target.value,
//                               });
//                             }}
//                 />
//                 <MDBInput style={{ color:"white"}}
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="USN"
//                   id="usn"
//                   type="text"
//                   size="lg"
//                   value={Data.usn}
//                             onChange={(e) => {
//                               setData({
//                                 ...Data,
//                                 usn: e.target.value,
//                               });
//                             }}
//                 />
//                 <MDBInput style={{ color:"white"}}
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Phone Number"
//                   id="phno"
//                   type="text"
//                   size="lg"
//                   value={Data.phno}
//                             onChange={(e) => {
//                               setData({
//                                 ...Data,
//                                 phno: e.target.value,
//                               });
//                             }}
//                 />
//                 <MDBInput style={{ color:"white"}}
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Password"
//                   id="password"
//                   type="password"
//                   size="lg"
//                   value={Data.password}
//                             onChange={(e) => {
//                               setData({
//                                 ...Data,
//                                 password: e.target.value,
//                               });
//                             }}
//                 />
//                   {Error && <p style={{ color: "red" }}>{Error}</p>}
//                 <MDBBtn type="submit" onClick={handleSignup} outline className="mx-2 px-5" color="white" size="lg">
//                   SIGN UP
//                 </MDBBtn>

//                 <br></br>

//                 <div>
//                   <p className="mb-0">
//                     Already have an account?
//                     <a
//                       class="text-white-50 fw-bold cursor-pointer"
//                       onClick={() => {
//                         params.PUserPresent(true);
//                       }}
//                     >
//                       {" "}
//                       Login
//                     </a>
//                   </p>
//                 </div>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// }

// export default Signup;

import React from 'react';
import './Signup.css'; // Import CSS file

function Signup() {
  // Function to toggle password visibility
  const togglePasswordVisibility = (id) => {
    const field = document.getElementById(id);
    if (field.type === 'password') {
      field.type = 'text';
    } else {
      field.type = 'password';
    }
  };

  return (
    <div className="flex-container">
      <h1>PERUSAL</h1>
      <div className="content-container">
        <div className="form-container">
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input type="text" name="usn" placeholder="USN" required />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <span
              className="toggle-visibility"
              onClick={() => togglePasswordVisibility('password')}
            >
              Show/Hide Password
            </span>
          </div>
        </div>
        <input type="submit" value="SIGN UP" className="submit-btn" />
        <div className="links">
          <a href="/login_page.html" className="link">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
