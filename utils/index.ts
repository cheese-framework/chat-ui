import cookie from "cookie";
import { NextApiRequest } from "next";
import Swal from "sweetalert2";

export const isLoggedIn = (req: NextApiRequest) => {
  const cookies = cookie.parse(req.headers?.cookie || "");

  if (cookies && cookies.chat_user) {
    return JSON.parse(cookies.chat_user);
  }
  return false;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export const showErrorMessage = (err: any) => {
  const { response } = err;

  if (response) {
    const { data } = response;
    if (data) {
      Swal.fire({
        title: "Error",
        text: data.message || "An error occurred.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred.",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Error",
      text: err.message || "An error occurred.",
      icon: "error",
    });
  }
};
