import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:1234"
})

const baseURL = "http://localhost:1234"
// const baseURL = "https://toxibook-backend.onrender.com"

export const createPostService = async (token, data, id, cb) => {
  try {
    const response = await axios.post(`${baseURL}/post`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        cb(id, {progress,}) // fazer o media progress ficar para o post
      }
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

export const getTrendingService = async (token) => {
  return await handleGetFunctions(`${baseURL}/post/trending`, token);
} 

export const getLatestPostService = async (token) => {
  return await handleGetFunctions(`${baseURL}/post`, token);
} 

export const getPostsByUserService = async (token, id) => {
  return await handleGetFunctions(`${baseURL}/post/user/${id}`, token);
} 

export const getReplysByUserService = async (token, id) => {
  return await handleGetFunctions(`${baseURL}/post/user/reply/${id}`, token);
} 

export const getPostByIdService = async (id, token) => {
  return await handleGetFunctions(`${baseURL}/post/${id}`, token);
} 

async function handleGetFunctions(url, token) {
  const response = await axios.get(url, 
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}