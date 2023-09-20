import { AlertBox } from "../components/AlertBox/AlertBox";
import PostCard from "../components/Cards/PostCard/PostCard";
import { MdComment } from "react-icons/md";

export function renderPosts(posts, wordSearch, isComment, loading) {
	let icon, text, theme;
	
	if(posts.length === 0 && !loading) {
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
	
	return posts.map((item, index) => 
		<PostCard
			type={isComment ? "comment" : null}
			wordSearch={wordSearch}
			key={item._id}
			id={item._id}
			postUser={item.user}
			post={item}
			permissions={item.permissions}
			liked={item.liked}
		/>
	);
}