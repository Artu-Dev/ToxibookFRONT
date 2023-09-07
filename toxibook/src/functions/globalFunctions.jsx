import { AlertBox } from "../components/AlertBox/AlertBox";
import PostCard from "../components/Cards/PostCard/PostCard";
import Loading from "../components/Layout/Loading/Loading";

export function renderPosts(posts, likedPosts = [], isLoading, wordSearch) {
	
	if(isLoading) return  <Loading position={"block"}/> 
	
	if(posts.length === 0) return <AlertBox text={"Nenhum Post encontrado"} icon={"?"} theme={"alert"}/>

	return posts.map((item) => (
		<PostCard
			wordSearch={wordSearch}
			key={item._id}
			id={item._id}
			postUser={item.user}
			post={item}
			permissions={item.permissions}
			liked={likedPosts.find((likedId) => likedId === item._id)}
		/>
	));
}