import "./CreatePost.css";
import UserContainer from "../Layout/UserContainer/UserContainer";

import {BsImageFill, BsTrash2Fill} from "react-icons/bs";
import {HiPaperAirplane} from "react-icons/hi2";
import { useCallback, useRef, useState } from "react";
import { Button } from "../Layout/Button/Button";
import { createPostService } from "../../services/post.services";

const CreatePost = ({token, userPFP, tag, username, verified, isShareOf, isCommentOf, setPostList, id}) => {
	const [allowComments, setAllowComments] = useState(true);
	const [isPrivatePost, setIsPrivatePost] = useState("public");
	const [imagesList, setImagesList] = useState([]);

	const textAreaRef = useRef();
	const isPrivateSelectRef = useRef();
	const imageFileInputRef = useRef();


	function autoGrow() {
		textAreaRef.current.style.height = "5px";
		textAreaRef.current.style.height = (textAreaRef.current.scrollHeight) + "px";
	}

	async function handleClickBtn() {
		// textContent,
		// imageContent,
		// isCommentOf,
		// isShareOf,

		// canComment,
		// privatePost,
		const data = {
			textContent: textAreaRef.current.value,
			isCommentOf,
			isShareOf,
			canComment: allowComments,
			privatePost: isPrivateSelectRef.current.value === "private"
		}
		console.log(data);
		try {
			const post = await createPostService(token, data);
			setPostList(post);
			console.log(post);
		} catch (err) {
			console.log(err);
		}
	}
	
	function handleSelectImages(imagesFileInput) {
		const imageList = imagesFileInput.files;
		Array.prototype.forEach.call(imageList, readAndPreviewImages)
	}
	
	function readAndPreviewImages(imageList) {
		if (!(/\.(jpe?g|png|gif)$/i.test(imageList.name))) {
			alert("formato invalido")
			return false;
		}
		const reader = new FileReader();
		reader.onload = function() {
			setImagesList((prev) => [...prev, reader.result])
		}

		reader.readAsDataURL(imageList);
	}

	function removeImage(index) {
		setImagesList(prev => prev.filter((_, i) => i !== index));
	}

	return (
    <div className="createPostContainer">
      <div className="createPost-topArea">
        <UserContainer
					id={id}
          userPFP={userPFP}
          tag={tag}
          username={username}
          verified={verified}
        />

        <div className="postConfigs centerFlex">
          <select
            className={`select-privatePost ${isPrivatePost}`}
            onChange={() => setIsPrivatePost(isPrivateSelectRef.current.value)}
            ref={isPrivateSelectRef}
          >
            <option value="public">Publico</option>
            <option value="private">Privado</option>
          </select>
          <span className="postPerms">
            <input
              type="checkbox"
              id="input-allowComments"
              onChange={() => setAllowComments(!allowComments)}
              checked={allowComments}
            />
            <label htmlFor="input-allowComments">Comentários</label>
          </span>
        </div>

        <textarea
          placeholder="Oque esta rolando?"
          onInput={autoGrow}
          ref={textAreaRef}
        ></textarea>
      </div>

      {imagesList.length !== 0 && (
        <ul className="images-container">
          {imagesList.map((img, index) =>
						<li key={index}>
							<img src={img} alt="#" />
							<i onClick={() => removeImage(index)}>
								<BsTrash2Fill />
							</i>
						</li>
						)
					}
        </ul>
      )}

      <div className="createPost-bottomArea centerFlex">
        <span className="uploadImage">
          <input
            type="file"
            id="imageInput"
            ref={imageFileInputRef}
            multiple={true}
						accept="image/*"
            onInput={() => handleSelectImages(imageFileInputRef.current)}
          />
          <label htmlFor="imageInput">
            <BsImageFill />
          </label>
        </span>

        <Button
          onClickBtn={() => handleClickBtn()}
          text={"Postar"}
          icon={<HiPaperAirplane />}
        />
      </div>
    </div>
  );
}

export default CreatePost