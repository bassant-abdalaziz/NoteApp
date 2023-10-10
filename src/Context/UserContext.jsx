import axios from "axios";

import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext(0);

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  //signUp
  async function sendDataToSignUp(values) {
    const { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .catch((err) => toast.error(err.response.data.msg));

    return data;
  }

  //login
  async function sendDataToLogin(values) {
    const { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .catch((err) => toast.error(err.response.data.msg));

    return data;
  }

  function logOut() {
    toast.success("successfully logged out!");
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <UserContext.Provider
      value={{ sendDataToSignUp, sendDataToLogin, token, setToken, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}
