import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import UserContainer from "../../Layout/UserContainer/UserContainer";
import PostMin from "../PostMin/PostMin";

import { formateDate1 } from "../../../functions/FormateDate";

import "./PostCard.css";
import { likePostService } from "../../../services/post.services";
import { useEffect, useState } from "react";
import PostActions from "./postActions/PostActions";
import ImageModal from "../../ImageModal/ImageModal";

const PostCard = ({ user, post, permissions, type, liked }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("AuthToken");

  const [showImageModal, setShowImageModal] = useState(false);
  const [postLiked, setPostLiked] = useState(liked);
  const [totalLikes, setTotalLikes] = useState(post.totalLikes);
  const [totalShares, setTotalShares] = useState(post.totalShares);
  const [totalComments, setTotalComments] = useState(post.totalComments);


  function handleClick(postId) {
    navigate(`/post/${postId}`);
  }

  function handleClickPost(postId) {
    handleClick(postId);
  }

  function handleClickIsCommentOf(event, isCommentId) {
    event.stopPropagation();
    handleClick(isCommentId);
  }

  async function handleLikePost(event) {
    event.stopPropagation();
    const likeResponse = await likePostService(post._id, token);
    setPostLiked(!postLiked);
    setTotalLikes(likeResponse.totalLikes);

    
    // if (postLiked) {
    //   setTotalLikes((prev) => prev - 1);
    // } else {
    //   setTotalLikes((prev) => prev + 1);
    // }
  }

  function handleImageClick(event) {
    event.stopPropagation();
    setShowImageModal(true);
  }

  return (
    <article
      className={`postContainer ${type}`}
      onClick={() => handleClickPost(post._id)}
    >
      <div className="topPost-container">
        <UserContainer
          id={user._id}
          userPFP={user.profileImg}
          username={user.username}
          tag={user.tag}
          verified={user?.verified}
        />
        <div className="infoContainer">
          <p>{formateDate1(post.createdAt)}</p>
          <i>
            <BsThreeDotsVertical />
          </i>
        </div>
      </div>
      <div className="postContent">
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

        {post.isShareOf && (
          <PostMin
            username={post.isShareOf.user.username}
            tag={post.isShareOf.user.tag}
            userPFP={post.isShareOf.user.profileImg}
            date={post.isShareOf.createdAt}
            postText={post.isShareOf.textContent}
            postImg={post.isShareOf.imageContent}
            postId={post.isShareOf._id}
            userId={post.isShareOf.user._id}
          />
        )}

        <PostActions
          postLiked={postLiked}
          onClick={(e) => handleLikePost(e)}
          totalComments={totalComments}
          totalLikes={totalLikes}
          totalShares={totalShares}
          canComment={permissions.canComment}
          privatePost={permissions.privatePost}
        />
      </div>
    </article>
  );
};

export default PostCard;
