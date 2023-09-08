import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const usePostContext = () => {
	return useContext(PostContext);
};

export const PostProvider = ({children}) => {
	const [posts, setPosts] = useState([]);

	const createPost = (newPost) => {
		setPosts(prev => [newPost, ...prev]);
	}

	const setPost = (newPost) => {
		setPosts(newPost);
	}

	const addPost = (newPost) => {
		setPosts([...posts, newPost]);
	}

	const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
	}

	return (
		<PostContext.Provider value={{posts, addPost, createPost, setPost, deletePost}}>
			{children}
		</PostContext.Provider>
	)

}