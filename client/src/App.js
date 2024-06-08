import React from "react";
import { Cookies, useCookies } from "react-cookie";
import ReactDOM from "react-dom/client";
import Auth from "./components/Auth";
import Main from "./components/Main";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const username = cookies.username;
  const authToken = cookies.AuthToken;

  return (
    <div>
      {!authToken && <Auth />}
      {authToken && <Main />}
    </div>
  );
  return <div className="App">HEY</div>;
}

export default App;
