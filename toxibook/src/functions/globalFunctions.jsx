import PostCard from "../components/Cards/PostCard/PostCard";
import Loading from "../components/Layout/Loading/Loading";

export function renderPosts(posts, likedPosts = [], isLoading) {
	if(isLoading) return  <Loading position={"block"}/> 

	if(posts.length === 0) return <p>Nenhuma postagem encontrado!</p>

	return posts.map((item) => (
		<PostCard
			key={item._id}
			id={item._id}
			user={item.user}
			post={item}
			permissions={item.permissions}
			liked={likedPosts.find((post) => post._id === item._id)}
		/>
	));
}