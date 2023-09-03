import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const usePostContext = () => {
	return useContext(PostContext);
};

export const PostProvider = ({children}) => {
	const [posts, setPosts] = useState([]);

	const createPost = (newPost) => {
		setPosts([newPost, ...posts]);
	}

	const setPost = (newPost) => {
		setPosts(newPost);
	}

	const addPost = (newPost) => {
		setPosts([...posts, newPost]);
	}

	const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
		console.log(posts)
	}

	return (
		<PostContext.Provider value={{posts, addPost,setPost, deletePost}}>
			{children}
		</PostContext.Provider>
	)

}