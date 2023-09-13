import { useState } from "react";
import { AlertBox } from "../components/AlertBox/AlertBox";
import PostCard from "../components/Cards/PostCard/PostCard";
import Loading from "../components/Layout/Loading/Loading";
import { MdComment } from "react-icons/md";

export function renderPosts(posts, isLoading, wordSearch, isComment, sentinelElementRef) {
	let icon, text, theme;
	
	if(isLoading) return  <Loading position={"block"}/> 
	if(posts.length === 0) {
		if(isComment){ 
			text = "Vazio por aqui! Parece que ainda não há comentários neste post.";
			icon = <MdComment/>;
			theme = "alert";
		} else {
			text = "Nenhum Post encontrado";
			icon = "?"
			theme = "alert";
		}
		
		return <AlertBox text={text} icon={icon} theme={theme}/>
	} 
	
	return posts.map((item, index) => {
		if(posts.length === index +1) {
			console.log(item)
			return (
				<PostCard
					ref={sentinelElementRef}
					wordSearch={wordSearch}
					key={item._id}
					id={item._id}
					postUser={item.user}
					post={item}
					permissions={item.permissions}
					liked={item.liked}
				/>
			)
		}
		else {
			return (
				<PostCard
					wordSearch={wordSearch}
					key={item._id}
					id={item._id}
					postUser={item.user}
					post={item}
					permissions={item.permissions}
					liked={item.liked}
				/>
			)
		}
	});
}