import React from "react";
import Search from './search.js';

import { Cookies, useCookies } from "react-cookie";
function Main() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const username = cookies.username;
  return (<Search></Search>);
}
export default Main;
