import axios from 'axios';

// const baseURL = "http://localhost:1234"
const baseURL = "https://toxibook-backend.onrender.com"


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

export const getTrendingService = async (token, page = 1) => {
  return await handleGetFunctions(`${baseURL}/post/trending?page=${page}`, token);
} 

export const getLatestPostService = async (token, page = 1) => {
  return await handleGetFunctions(`${baseURL}/post?page=${page}`, token);
} 

export const getPostsByUserService = async (token, id, page = 1) => {
  return await handleGetFunctions(`${baseURL}/post/user/${id}?page=${page}`, token);
} 

export const getReplysByUserService = async (token, id, page) => {
  return await handleGetFunctions(`${baseURL}/post/user/reply/${id}?page=${page}`, token);
} 

export const getPostByIdService = async (id, token) => {
  return await handleGetFunctions(`${baseURL}/post/${id}`, token);
} 

export const getCommentsService = async (id, token, page) => {
  return await handleGetFunctions(`${baseURL}/post/comments/${id}?page=${page}`, token);
} 

export const deletePostService = async (id, token) => {
  const response = await axios.delete(`${baseURL}/post/delete/${id}`, 
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
} 

export const getPostBySearchService = async (param, token, page) => {
    const response = await axios.get(`${baseURL}/post/search?page=${page}`, 
    {
      params: {searchParam: param},
      headers: { Authorization: `Bearer ${token}` }
    });
  return response.data;
} 

async function handleGetFunctions(url, token) {
  const response = await axios.get(url, 
  {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}