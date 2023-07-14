import axios from 'axios';

// const baseURL = "http://localhost:1234"
const baseURL = "https://toxibook-backend.onrender.com"

export const createPostService = async (token, data) => {
  try {
    const response = await axios.post(`${baseURL}/post/trending`,
    {data},
    {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
} 

export const getTrendingService = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/post/trending`,
    {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
} 

export const getPostByIdService = async (id, token) => {
  try {
    const response = await axios.get(`${baseURL}/post/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
} 

export const likePostService = async (id, token) => {
  try {
    const response = await axios.patch(`${baseURL}/post/like/${id}`, 
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
} 