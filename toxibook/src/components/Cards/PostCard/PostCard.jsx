import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import UserContainer from "../../Layout/UserContainer/UserContainer";
import PostMin from "../PostMin/PostMin";

import { formateDate1 } from "../../../functions/FormateDate";

import "./PostCard.css";
import { useEffect, useRef, useState } from "react";
import PostActions from "./PostActions/PostActions";
import ImageModal from "../../ImageModal/ImageModal";
import twemoji from "twemoji";
import { PostOptions } from "../../PostOptions/PostOptions";
import { PostText } from "./PostText/PostText";

const PostCard = ({ postUser, post, permissions, type = "normalPost", liked, wordSearch}) => {
  const navigate = useNavigate();
  const postRef = useRef();
  const textContentRef = useRef();
  const postOptionContainerRef = useRef();

  const [showImageModal, setShowImageModal] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);

  function handleClick(postId) {
    navigate(`/post/${postId}`);
  }

  function handleClickIsCommentOf(event, isCommentId) {
    event.stopPropagation();
    event.preventDefault();
    handleClick(isCommentId);
  }

  function handleImageClick(event) {
    event.stopPropagation();
    event.preventDefault();
    setShowImageModal(true);
  }

  useEffect(() => {
    twemoji.parse(postRef.current);

    function handleClickOutside(event) {
      if(postOptionContainerRef.current && !postOptionContainerRef.current.contains(event.target)){
        setShowPostOptions(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [])

  return (
    <article ref={postRef} className={`postContainer ${type}`}>
      <div className="topPost-container">
        <UserContainer
          user={postUser}
          verified={postUser?.verified}
        />
        <div className="infoContainer">
          <p>{formateDate1(post.createdAt)}</p>
          <span ref={postOptionContainerRef}>
            <span onClick={() => setShowPostOptions(!showPostOptions)} ><BsThreeDotsVertical /></span>
            {showPostOptions &&
              <PostOptions
                postId={post._id}
                isYourPost={post.isYourPost}
                onClose={() => setShowPostOptions(!showPostOptions)}
              />
            }
          </span>


        </div>
      </div>
      <Link to={`/post/${post._id}`} className="postContent">
        {post.isCommentOf && (
          <span
            className="isComment"
            onClick={(event) =>
              handleClickIsCommentOf(event, post.isCommentOf._id)
            }
          >
            Respondendo a: <span>{post.isCommentOf.user.tag}</span>
          </span>
        )}

        <PostText text={post.textContent} wordSearch={wordSearch}/>

        {post.imageContent && (
          <>
            <img
              src={post.imageContent}
              alt={`imagem de ${postUser.username}`}
              onClick={handleImageClick}
              loading="lazy"
            />
            {showImageModal && (
              <ImageModal
                imageSrc={post.imageContent}
                setShowImageModal={() => setShowImageModal(false)}
              />
            )}
          </>
        )}
      </Link>
      {post.isShareOf && (
        <PostMin
          date={post.isShareOf.createdAt}
          postText={post.isShareOf.textContent}
          postImg={post.isShareOf.imageContent}
          postId={post.isShareOf._id}
          
          post={post.isShareOf}
          user={postUser}
        />
      )}
      <PostActions
        liked={liked}
        post={post}
        permissions={permissions}
      />
    </article>
  );
};

export default PostCard;
