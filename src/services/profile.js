import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const fetchProfile = (token) => {
  return axios
    .post(
      API_URL + "profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data.body;
    });
};

const ProfileService = {
  fetchProfile,
};

export default ProfileService;
