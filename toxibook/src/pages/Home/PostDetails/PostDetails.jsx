import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import PostCard from "../../../components/Cards/PostCard/PostCard"

import { getCommentsService, getPostByIdService } from "../../../services/post.services";
import Loading from "../../../components/Layout/Loading/Loading" 
import CreatePost from "../../../components/CreatePost/CreatePost";
import "./PostDetails.css"
import { AlertBox } from "../../../components/AlertBox/AlertBox";
import {  MdLock } from "react-icons/md";
import {NavSide} from "../../../components/NavSide/NavSide";
import toxibookLogo from "../../../img/toxibookLogo.webp";
import { renderPosts } from "../../../functions/globalFunctions";
import { usePostContext } from "../../../contexts/PostContext";
import { HiArrowLeft } from "react-icons/hi2";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams("id");
  const token = localStorage.getItem("AuthToken");
  const {posts: comments, setPost: setComments} = usePostContext();

  const redirect = useNavigate();

  useEffect(() => {
    async function fetchPostById() {
      try {
        setLoading(true);
        const {post, isLiked} = await getPostByIdService(id, token);
        const commentsResponse = await getCommentsService(id, token);
        
        setComments(commentsResponse);
        setIsLiked(isLiked)
        setPost(post);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchPostById();
  }, [id]);

  if (loading) return <Loading />;
  if(!post) return <p>Post não encontrado!</p>
  return (
    <div className="PostDetails-Container centerFlex">
      <NavSide/>

      <div className="simpleNavBar">
        <div>
          <div className="backButton" onClick={() => redirect("/")}>
            <HiArrowLeft/>
          </div>
          <img className="toxibookLogo" src={toxibookLogo} alt="toxibook logo" />
        </div>
      </div>
      
      <div className="posts-container">
        <PostCard 
          liked={isLiked}
          post={post}
          permissions={post.permissions}
          postUser={post.user}
        />
        {post?.permissions.canComment ?
          <CreatePost 
            type={"reply"}
            isCommentOf={post.user.tag}
            isCommentOfID={post._id}
          />
          :
          <AlertBox
            theme={"alert"}
            icon={<MdLock/>}
            text={"Uh-oh! Parece que os comentários estão desativados pelo autor deste post."}
          />
        }
        {post?.permissions.canComment &&
          renderPosts(comments, loading, null, true)
        }
        
      </div>
    </div>
  )
}

export default PostDetails