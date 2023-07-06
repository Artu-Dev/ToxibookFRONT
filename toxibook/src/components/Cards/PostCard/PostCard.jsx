import {TbRadioactiveFilled} from 'react-icons/tb';
import {FaComments, FaShareAlt} from 'react-icons/fa';
import {BsThreeDotsVertical} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'

import UserContainer from '../../Layout/UserContainer/UserContainer'
import PostMin from '../PostMin/PostMin';

import { formateDate1 } from '../../../functions/FormateDate';

import "./PostCard.css"
import { likePostService } from '../../../services/post.services';
import { useEffect, useState } from 'react';
import PostActions from './postActions/PostActions';

const PostCard = ({user, id, post, permissions, type, liked}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("AuthToken");

  const [postLiked, setPostLiked] = useState(liked);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    setTotalLikes(post.totalLikes);
    setTotalShares(post.totalShares);
    setTotalComments(post.totalComments);
  }, [])

  function handleClick(postId) {
    navigate(`/post/${postId}`);
  }
  
  function handleClickPost(postId) {
    handleClick(postId)
  }

  function handleClickIsCommentOf(event, isCommentId){
    event.stopPropagation();
    handleClick(isCommentId);
  }

  function handleLikePost(event){
    event.stopPropagation();
    setPostLiked(!postLiked);
    if(postLiked) {
      setTotalLikes(prev => prev-1)
    } else {
      setTotalLikes(prev => prev+1)
    }
    likePostService(post._id, token);
  }

// console.log(liked);

  return (
    <article className={`postContainer ${type}`} onClick={() => handleClickPost(post._id)}>
      <div className="topPost-container">
        <UserContainer 
          userPFP={user.profileImg}
          username={user.username}
          tag={user.tag}
          verified={user?.verified}
        />
        <div className="infoContainer">
          <p>{formateDate1(post.createdAt)}</p>
          <i><BsThreeDotsVertical/></i>
        </div>
      </div>
      {post.isCommentOf && (
        <span
          className="isComment"
          onClick={(event) => handleClickIsCommentOf(event, post.isCommentOf._id)}
        >
          Respondendo a: <span>{post.isCommentOf.user.tag}</span>
        </span>
      )}
      <div className="postContent">
        <p>
          {post.textContent}
        </p>
        {post.imageContent &&
          <img src={post.imageContent} alt={`imagem de ${user.username}`} />
        }
        
        { post.isShareOf &&
          <PostMin
            username={post.isShareOf.user.username}
            tag={post.isShareOf.user.tag}
            userPFP={post.isShareOf.user.profileImg}
            date={post.isShareOf.createdAt}
            postText={post.isShareOf.textContent}
            postImg={post.isShareOf.imageContent}
            postId={post.isShareOf._id}
          />
        }

      </div>
      <PostActions 
        postLiked={postLiked}
        onClick={(e) => handleLikePost(e)}
        totalComments={totalComments}
        totalLikes={totalLikes}
        totalShares={totalShares}
        canComment={permissions.canComment}
        privatePost={permissions.privatePost}
      />
    </article>
  )
}

export default PostCard