import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";

import UserContainer from "../../Layout/UserContainer/UserContainer";
import PostMin from "../PostMin/PostMin";

import { formateDate1 } from "../../../functions/FormateDate";

import "./PostCard.css";
import { useState } from "react";
import PostActions from "./postActions/PostActions";
import ImageModal from "../../ImageModal/ImageModal";

const PostCard = ({ user, post, permissions, type = "normalPost", liked }) => {
  const navigate = useNavigate();

  const [showImageModal, setShowImageModal] = useState(false);

  function handleClick(postId) {
    navigate(`/post/${postId}`);
  }

  function handleClickIsCommentOf(event, isCommentId) {
    event.stopPropagation();
    handleClick(isCommentId);
  }

  function handleImageClick(event) {
    event.stopPropagation();
    event.preventDefault();
    setShowImageModal(true);
  } 

  return (
    <article className={`postContainer ${type}`}>
      <div className="topPost-container">
        <UserContainer
          user={user}
          verified={user?.verified}
        />
        <div className="infoContainer">
          <p>{formateDate1(post.createdAt)}</p>
          <i>
            <BsThreeDotsVertical />
          </i>
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
        <p>{post.textContent}</p>
        {post.imageContent && (
          <>
            <img
              src={post.imageContent}
              alt={`imagem de ${user.username}`}
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
          user={user}
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
