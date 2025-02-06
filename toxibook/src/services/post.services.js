import axios from 'axios';

const baseURL = "https://toxibook-backend.onrender.com"
// const baseURL = process.env.REACT_APP_API_URL || "http://localhost:1234";



const createApiInstance = (token) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const createPostService = async (token, data, tempId, progressCallback) => {
  try {
    if (!token || !data) throw new Error('Missing required parameters');
    
    const api = createApiInstance(token);
    const response = await api.post('/post', data, {
      onUploadProgress: e => {
        const progress = Math.round((e.loaded * 100) / e.total);
        progressCallback?.(tempId, { progress });
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
};


export const likePostService = async (id, token) => {
  try {
    if (!token || !id) throw new Error('Missing required parameters');
    
    const api = createApiInstance(token);
    const response = await api.patch(`/post/like/${id}`, {});
    
    return response.data;
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
}; 

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
  const api = createApiInstance(token);
  const response = await api.get(url);
  return response.data;
}
