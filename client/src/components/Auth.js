import { Fragment, useEffect, useState } from "react";
import Login from "./Authentication/Login.js";
import Signup from "./Authentication/Signup.js";
import Home from "./Home";

function Auth(params) {
  const [userPresent, setUserPresent] = useState(true);
  const [atHome, setAtHome] = useState(false);

  function HandleSetUserPresent(val) {
    setUserPresent(val);
  }
  function HandleSetAtHome(val) {
    setAtHome(val);
  }

  if (atHome) {
    return (
      <Home PAtHome={HandleSetAtHome} PUserPresent={HandleSetUserPresent} />
    );
  } else if (!atHome && !userPresent) {
    return (
      <Fragment>
        <Signup PUserPresent={HandleSetUserPresent} />
      </Fragment>
    );
  } else if (!atHome && userPresent) {
    return (
      <Fragment>
        <Login PUserPresent={HandleSetUserPresent} />
      </Fragment>
    );
  }
}

export default Auth;
