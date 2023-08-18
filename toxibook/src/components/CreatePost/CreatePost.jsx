import React, { useRef, useState, useEffect, useContext } from "react";
import { BsImageFill, BsTrash2Fill } from "react-icons/bs";
import { HiPaperAirplane } from "react-icons/hi2";
import { entries, uniqueId } from "lodash";
import { filesize } from "filesize";
import { CircularProgressbar } from "react-circular-progressbar";

import { UserContext, AuthUserContext } from "../../contexts/AuthUser";
import { api, createPostService } from "../../services/post.services";
import UserContainer from "../Layout/UserContainer/UserContainer";
import { Button } from "../Layout/Button/Button";
import Dropzone from "react-dropzone";

import "./CreatePost.css";


const CreatePost = ({token, isShareOf, isCommentOf, isCommentOfID, setPostList, type}) => {
	const [textContent, setTextContent] = useState(null);
	const [allowComments, setAllowComments] = useState(true);
	const [isPrivatePost, setIsPrivatePost] = useState("public");
  
  const { signed } = useContext(AuthUserContext);

	const isPrivateSelectRef = useRef();
	const textAreaRef = useRef();
	const inputImageReg = useRef();

  const [mediaState, setMediaState] = useState([]);

  const user = JSON.parse(localStorage.getItem("User"));
  
	function autoGrow() {
    setTextContent(textAreaRef.current.value)
		textAreaRef.current.style.height = "5px";
		textAreaRef.current.style.height = (textAreaRef.current.scrollHeight) + "px";
	}

  function updateMediaProgress(id, data) {
    // setMediaState(prev => prev.map(uploadedFile => {
    //   return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
    // }))
    setMediaState(prev => ({ ...prev, ...data }));
  }

  function appendDataIfValid(data, key, value) {
    if (value && value.length) {
      data.append(key, value);
    }
  }

	async function handleUploadPost() {
    const data = new FormData();
    appendDataIfValid(data, "canComment", allowComments);
    appendDataIfValid(data, "privatePost", isPrivateSelectRef.current.value === "private");
    appendDataIfValid(data, "isShareOf", isShareOf);
    appendDataIfValid(data, "isCommentOf", isCommentOfID);
    appendDataIfValid(data, "textContent", textContent);
    if(!!Object.keys(mediaState).length) {
      data.append("imageContent", mediaState?.imageFile, mediaState?.name);
    }
    // for (let entry of data.entries()) {
    //   console.log(entry);
    // }
    try {
			const post = await createPostService(token, data, mediaState?.id, updateMediaProgress);

			setPostList(post);
      setMediaState([]);
      textAreaRef.current.value = null;
      inputImageReg.current.value = null
		} catch (err) {
			console.log(err);
		}
	}
	
	function handleProcessImageFiles(imagesFiles) {
		Array.prototype.forEach.call(imagesFiles, processIndividualImage)
	}
	
	function processIndividualImage(imageFile) {
		if (!(/\.(jpe?g|png|gif)$/i.test(imageFile.name))) {
			alert("formato invalido")
			return false;
		}

    const objectFile = ({
      imageFile: imageFile,
      id: uniqueId(),
      name: imageFile.name,
      readableSize: filesize(imageFile.size),
      preview: URL.createObjectURL(imageFile),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    });

    setMediaState(objectFile);
    // setMediaState((prevFilesState) => [...prevFilesState, uploadedFile]);
	}
  // console.log(mediaState);
	function removeImage(index) {
		// setMediaState(prev => prev.filter((_, i) => i !== index));
    
    inputImageReg.current.value = null
		setMediaState([]);
	}

  function renderImages() { 
    return (
      <>
        {mediaState.preview && (
          <ul className="images-container">
            <li>
              <img src={mediaState.preview} alt="#" />

              <span className="trashIcon" onClick={() => removeImage()}>
                <BsTrash2Fill />
              </span>

              {!mediaState.uploaded && !mediaState.error && mediaState.progress && (
                <div className="circularProgressbar">
                  <CircularProgressbar
                    styles={{
                      root: { width: 35 },
                      path: { stroke: "#2cb311" },
                      trail: { stroke: "#ffffff44" },
                    }}
                    strokeWidth={20}
                    value={mediaState.progress}
                  />
                </div>
              )}
            </li>
            {/* {mediaState.map((media, index) => (
            ))} */}
          </ul>
        )}
      </>
    );
  }

	if(!signed) return 
	return (
    <div className={`createPostContainer ${type}`}>
      <div className="createPost-topArea">
        <UserContainer
          user={user}
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

        {isCommentOf && (
          <div className="typeOfPost">
            <p className="isCommentOf">Responder a: @{isCommentOf}</p>
          </div>
        )}

        <Dropzone
          accept={{ "image/*": [] }}
          onDropAccepted={handleProcessImageFiles}
          noClick={true}
          noKeyboard={true}
        >
          {({ getRootProps, isDragActive, isDragReject}) => (
            <div className="textArea-container">
              <textarea
                {...getRootProps()}
                placeholder="Oque esta rolando?"
                onInput={autoGrow}
                ref={textAreaRef}
              ></textarea>

              {isDragActive && (
                <span 
                  {...getRootProps()}
                  className={`dragArea centerFlex ${isDragReject ? "dragReject" : ""}`}
                >
                  {!isDragReject ? "Solte sua a imagem aqui!" : "Arquvo não suportado!"}
                </span>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      {renderImages()}

      <div className="createPost-bottomArea centerFlex">
        <span className="uploadImage">
          <input
            type="file"
            id="imageInput"
            ref={inputImageReg}
            multiple={false}
            accept="image/*"
            onInput={(e) => handleProcessImageFiles(e.target.files)}
          />
          <label htmlFor="imageInput">
            <BsImageFill />
          </label>
        </span>

        <Button
          onClickBtn={() => handleUploadPost()}
          loading={mediaState?.progress}
          text={"Postar"}
          icon={<HiPaperAirplane />}
        />
      </div>
    </div>
  );
}

export default CreatePost