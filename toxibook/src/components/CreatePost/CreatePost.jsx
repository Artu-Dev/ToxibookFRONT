import "./CreatePost.css";
import UserContainer from "../Layout/UserContainer/UserContainer";

import {BsImageFill, BsTrash2Fill} from "react-icons/bs";
import {HiPaperAirplane} from "react-icons/hi2";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../Layout/Button/Button";
import { createPostService } from "../../services/post.services";
import { isLoggedInService } from "../../services/user.services";
import { AuthUserContext, UserContext } from "../../contexts/AuthUser";

const CreatePost = ({token, isShareOf, isCommentOf, isCommentOfID, setPostList, type}) => {
	const [allowComments, setAllowComments] = useState(true);
	const [isPrivatePost, setIsPrivatePost] = useState("public");
	const [imagesList, setImagesList] = useState([]);
	const [imagesLink, setImagesLink] = useState(null);
  
  const user = useContext(UserContext);
  const {signed} = useContext(AuthUserContext);

	const textAreaRef = useRef();
	const isPrivateSelectRef = useRef();
	const imageFileInputRef = useRef();

	
  useEffect(() => {
    if(imagesLink) {
      handleUploadPost();
    }
  }, [imagesLink]);


  function uploadImage() {
    console.log("upload iniciado!");
    const imagesRef = ref(storage, `${user.tag}/${Date.now()}`);

    uploadString(imagesRef, imagesList[0], "data_url").then((snapshot) => {
      console.log("upload feito!");

      getDownloadURL(snapshot.ref).then((downloadURL) => {
        // setImagesLink(downloadURL, ...imagesLink);

        const customMetadata = {
          uploadedBy: user.uid, //pegar o uid do localStorage
        }

        updateMetadata(imagesRef, customMetadata)
          .then((metadata) => {
            console.log(metadata);
          }).catch((error) => {
            console.log(error);
          });

        setImagesLink(downloadURL);
        handleUploadPost();
      });
    });
  }
  
	function autoGrow() {
		textAreaRef.current.style.height = "5px";
		textAreaRef.current.style.height = (textAreaRef.current.scrollHeight) + "px";
	}

	async function handleUploadPost() {
		const data = {
			textContent: textAreaRef.current.value,
      imageContent: imagesLink, 
			isCommentOf: isCommentOfID,
			isShareOf,
			canComment: allowComments,
			privatePost: isPrivateSelectRef.current.value === "private"
		}
		console.log(data);
		try {
			const post = await createPostService(token, data);
			setPostList(post);

      textAreaRef.current.value =  null;
      isPrivateSelectRef.current.value = null;
      setImagesList([]);
      setImagesLink(null);
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
			// setImagesList((prev) => [...prev, reader.result])
			setImagesList([reader.result])
		}

		reader.readAsDataURL(imageList);
	}

	function removeImage(index) {
		// setImagesList(prev => prev.filter((_, i) => i !== index));
		setImagesList([]);
	}

	// if(!signed) return 
	return (
    <div className={`createPostContainer ${type}`}>
      <div className="createPost-topArea">
        <UserContainer
					id={user._id}
          username={user.username}
          tag={user.tag}
          userPFP={user.profileImg}
          verified={user?.verified}
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
				{isCommentOf && 
					<div className="typeOfPost">
						<p className="isCommentOf">Responder a: @{isCommentOf}</p>
					</div>
				}
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
        {/* <span className="uploadImage">
          <input
            type="file"
            id="imageInput"
            ref={imageFileInputRef}
            multiple={false}
						accept="image/*"
            onInput={() => handleSelectImages(imageFileInputRef.current)}
          />
          <label htmlFor="imageInput">
            <BsImageFill />
          </label>
        </span> */}
        
        <Button
          onClickBtn={() => imagesList ? uploadImage() : handleUploadPost() }
          text={"Postar"}
          icon={<HiPaperAirplane />}
        />
      </div>
    </div>
  );
}

export default CreatePost