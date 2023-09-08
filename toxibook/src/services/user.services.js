import axios from 'axios';

const baseURL = "http://localhost:1234"
// const baseURL = "https://toxibook-backend.onrender.com"


export const loginAuthService = async (email, password) => {
  const response = await axios.post(`${baseURL}/login`,
    { email, password }
  );
  return response.data;
}

export const getUserService = async (token, userID) => {
  const response = await axios.get(`${baseURL}/user/${userID}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export const updateUserDatasService = async (token, userID, data) => {
  const response = await axios.patch(`${baseURL}/user/update/${userID}`,data,
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export const followUserService = async (token, userID) => {
  const response = await axios.patch(`${baseURL}/user/follow/${userID}`,{},
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export const isLoggedInService = async (token) => {
  const response = await axios.get(`${baseURL}/user/isLogged`,
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response?.data;
}
