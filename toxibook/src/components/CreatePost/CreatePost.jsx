import "./CreatePost.css";
import UserContainer from "../Layout/UserContainer/UserContainer";

import {BsImageFill} from "react-icons/bs";
import {HiPaperAirplane} from "react-icons/hi2";
import { useRef, useState } from "react";
import { Button } from "../Layout/Button/Button";
import { createPostService } from "../../services/post.services";

const CreatePost = ({textContent, imageContent, isShareOf, isCommentOf}) => {
	const [allowComments, setAllowComments] = useState(true);
	const user = localStorage.getItem("User");
	const textAreaRef = useRef();
	const isPublicSelectRef = useRef();
	const imageFileInputRef = useRef();

	function autoGrow() {
		textAreaRef.current.style.height = "5px";
		textAreaRef.current.style.height = (textAreaRef.current.scrollHeight) + "px";
	}

	function handleClickBtn() {
		// textContent,
		// imageContent,
		// isCommentOf,
		// isShareOf,

		// canComment,
		// privatePost,
		const token = localStorage.getItem("AuthToken");
		const data = {
			textContent: textAreaRef.current.value,
			isCommentOf,
			isShareOf,
			canComment: allowComments,
			privatePost: Boolean(isPublicSelectRef.current.value)
		}

		try {
			createPostService(token, data);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="createPostContainer">
			OI
		</div>
	)
}

export default CreatePost