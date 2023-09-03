import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import PostCard from "../../../components/Cards/PostCard/PostCard"

import { getPostByIdService } from "../../../services/post.services";
import Loading from "../../../components/Layout/Loading/Loading" 
import CreatePost from "../../../components/CreatePost/CreatePost";
import "./PostDetails.css"
import { AlertBox } from "../../../components/AlertBox/AlertBox";
import { MdComment, MdLock } from "react-icons/md";
import {NavSide} from "../../../components/NavSide/NavSide";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams("id");
  const token = localStorage.getItem("AuthToken");

  // console.log(post);

  useEffect(() => {
    async function fetchPostById() {
      try {
        setLoading(true);
        const {post, isLiked} = await getPostByIdService(id, token);
        const commentPromises = post.comments.map(commentId => {
          return getPostByIdService(commentId, token);
        });
        const commentsResponse = await Promise.all(commentPromises);

        setComments(commentsResponse);
        setIsLiked(isLiked.length)
        setPost(post);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchPostById();
  }, [id]);

  function renderComments() {
    if(!post?.permissions.canComment) {
      return <AlertBox
        theme={"alert"}
        icon={<MdLock/>}
        text={"Uh-oh! Parece que os comentários estão desativados pelo autor deste post."}
      />
    }

    if(!comments.length) {
      return <AlertBox
        theme={"green"}
        icon={<MdComment/>}
        text={"Vazio por aqui! Parece que ainda não há comentários neste post."}
      />
    }

    return comments.map(({post, isLiked}) => (
      <PostCard 
        key={post._id}
        post={post}
        permissions={post.permissions}
        postUser={post.user}
        type={"comment"}
        liked={isLiked === post._id}
      />
    ))
  }

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
      {post?.permissions.canComment &&
        <CreatePost 
          type={"reply"}
          token={token}
          setPostList={(itemPost) => setComments(prev => [itemPost, ...prev])}
          isCommentOf={post.user.tag}
          isCommentOfID={post._id}
        />
      }
      {comments && renderComments()}
    </div>
  )
}

export default PostDetails