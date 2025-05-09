import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.status === 400) {
        throw new Error(response.data.message);
      }
      return response.data.body.token;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
