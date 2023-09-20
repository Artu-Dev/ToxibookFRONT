import { deletePostService } from "../../services/post.services";
import "./PostOptions.css";

export const PostOptions = ({onClose, isYourPost, postId, onDeletePost}) => {
	const token = localStorage.getItem("AuthToken");

	function handleCopyLink(e) {
		e.preventDefault();
		const link = `${window.location.host}/post/${postId}`
		navigator.clipboard.writeText(link)
			.then(() => {
				onClose();
			});
	}

	async function handleDeletePost() {
		const confirmDelete = confirm("Tem certeza de que deseja apagar permanentemente o seu post?")
		if(!confirmDelete) return false;

		try {
			await deletePostService(postId, token)
			onDeletePost(postId);
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<div onClick={onClose} className="postOptions-container">
			<ul className="postOptions-list">
				<li onClick={handleCopyLink}>
					Copiar Link
				</li>
				<li>Denunciar</li>
				{isYourPost &&
					<li onClick={handleDeletePost}>Apagar Post</li>
				}
			</ul>
		</div>
	)
}