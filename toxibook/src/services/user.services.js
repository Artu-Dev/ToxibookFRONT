import axios from 'axios';

// const baseURL = "http://localhost:1234"
const baseURL = "https://toxibook-backend.onrender.com"


export const loginAuthService = async (email, password) => {
	try {
    const response = await axios.post(`${baseURL}/login`,
			{ email, password }
		);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export const getUserService = async (token, userID) => {
  try {
    const response = await axios.get(`${baseURL}/user/${userID}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export const isLoggedInService = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/user/isLogged`,
    {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error)
  }
}
