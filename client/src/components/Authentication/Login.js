// import React from "react";
// import { useEffect, useState } from "react";
// import ReactDOM from "react";
// import Home from "../Home";
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

// function Login(params) {
//   const [cookies, setCookie, removeCookie] = useCookies(null);
//   const username = cookies.username;
//   const authToken = cookies.AuthToken;
//   const [Data, setData] = useState({});
//   const [Error, setError] = useState(null);

//   async function handleLogin(e) {
//     e.preventDefault();
//     try {
//       const body = Data;
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       const data = await response.json();
//       if (response.status == 200) {
//         console.log(data);
//         setCookie("username", data.username);
//         setCookie("AuthToken", data.token);
//       } else if (response.status == 400) {
//         setError(data);
//         console.log(data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   return (
//     <MDBContainer>
//       <MDBRow className="d-flex justify-content-center align-items-center h-100">
//         <MDBCol col="12">
//           <MDBCard id="box"
//             className="text-white my-5 mx-auto"
//             style={{ borderRadius: "1rem", maxWidth: "1000px",backgroundColor: "rgba(0 0 0/50%)"}}
//           >
//             <div className="cont">
//               <div className="login-creds">
//                 <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
//                   <h2 className="fw-bold mb-2 text-uppercase">LOG IN</h2>
//                   <p className="text-white-50 mb-5">Join for all the fun!</p>

//                   <br></br>
//                   <MDBInput style={{ color:"white"}}
//                     wrapperClass="mb-4 mx-5 w-100"
//                     labelClass="text-white"
//                     label="Username"
//                     id="formControlLg"
//                     type="text"
//                     size="lg"
//                     value={Data.username}
//                     onChange={(e) => {
//                       setData({
//                         ...Data,
//                         username: e.target.value,
//                       });
//                     }}
//                   />
//                   <MDBInput style={{ color:"white"}}
//                     wrapperClass="mb-4 mx-5 w-100"
//                     labelClass="text-white"
//                     label="Password"
//                     id="formControlLg"
//                     type="password"
//                     size="lg"
//                     value={Data.password}
//                     onChange={(e) => {
//                       setData({
//                         ...Data,
//                         password: e.target.value,
//                       });
//                     }}
//                   />
//                   {Error && <p style={{ color: "red" }}>{Error}</p>}
//                   <MDBBtn
//                     outline
//                     className="mx-2 px-5"
//                     color="white"
//                     size="lg"
//                     onClick={handleLogin}
//                   >
//                     LOG IN
//                   </MDBBtn>
//                   <br></br>
//                   <div>
//                     <p className="mb-0">
//                       Already have an account?
//                       <a
//                         class="text-white-50 fw-bold cursor-pointer"
//                         onClick={() => {
//                           params.PUserPresent(false);
//                         }}
//                       >
//                         {" "}
//                         Signup
//                       </a>
//                     </p>
//                   </div>
//                 </MDBCardBody>
//               </div>
//               <div className="login-img">
//                 <img src="https://t3.ftcdn.net/jpg/05/74/72/86/360_F_574728684_voyDBkCWq2cKEd3MDoNE0nQLrWYFVxFh.jpg" height="300px" width="500px" alt="bot waving"/>
//               </div>
//             </div>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';

function Login(params) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(null);
  const [Data, setData] = useState({});
  const [Error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const body = Data;
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("Herere",data);
        setCookie("username", data.username);
        setCookie("AuthToken", data.token);
        navigate('/main');
      } else {
        setError(data.message);
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex-container">
      <h1>PERUSAL</h1>
      <div className="content-container">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder=" Username"
              required
              value={Data.username}
              onChange={(e) => {
                setData({
                  ...Data,
                  username: e.target.value,
                });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder=" Password"
              required
              value={Data.password}
              onChange={(e) => {
                setData({
                  ...Data,
                  password: e.target.value,
                });
              }}
            />
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <input type="submit" value="LOGIN" className="submit-btn" />
          </form>
          <div className="links">
          <Link to="/signup" className="link">
              New to Perusal? Sign-up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
