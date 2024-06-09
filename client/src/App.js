// import React from "react";
// import { Cookies, useCookies } from "react-cookie";
// import ReactDOM from "react-dom/client";
// import Auth from "./components/Auth";
// import Main from "./components/Main";

// function App() {
//   const [cookies, setCookie, removeCookie] = useCookies(null);
//   const username = cookies.username;
//   const authToken = cookies.AuthToken;

//   return (
//     <div>
//       {!authToken && <Auth />}
//       {authToken && <Main />}
//     </div>
//   );
//   return <div className="App">HEY</div>;
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import ReactDOM from "react-dom/client";
import Auth from "./components/Auth";
import Main from "./components/Main";
import SignUp from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Home from "./components/Home"; // Import the Home component
import AddBadge from "./components/AddBadge";
import Profile from "./components/Profile";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const username = cookies.username;
  const authToken = cookies.AuthToken;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for Home */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={!authToken ? <Auth /> : <Main />} />
          <Route path="/add" element={<AddBadge />} />
          <Route path="/profile/:username" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


