import Cookies from "js-cookie";

// Helper function to get a cookie by name
function getCookie(cookieName) {
  return Cookies.get(cookieName);
}

export default getCookie;
