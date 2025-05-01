import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("response", response);
      if (response.data.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.body.token));
      } else if (response.data.status === 400) {
        throw new Error(response.data.message);
      }
      return response.data.body.token;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser: getCurrentToken,
};

export default AuthService;
