import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import PostCard from "../../../components/Cards/PostCard/PostCard"

import { getCommentsService, getPostByIdService } from "../../../services/post.services";
import Loading from "../../../components/Layout/Loading/Loading" 
import CreatePost from "../../../components/CreatePost/CreatePost";
import "./PostDetails.css"
import { AlertBox } from "../../../components/AlertBox/AlertBox";
import {  MdLock } from "react-icons/md";
import {NavSide} from "../../../components/NavSide/NavSide";
import { useUserContext } from "../../../contexts/AuthUser";
import { renderPosts } from "../../../functions/globalFunctions";
import { usePostContext } from "../../../contexts/PostContext";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  // const [comments, setComments] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams("id");
  const token = localStorage.getItem("AuthToken");
  const {posts: comments, setPost: setComments} = usePostContext();

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
  )
}

export default PostDetails