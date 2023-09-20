import { useCallback, useEffect, useRef, useState } from "react"
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
import { BsXCircleFill } from "react-icons/bs";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { id } = useParams("id");
  const token = localStorage.getItem("AuthToken");
  const {posts: comments, addPost: addComments} = usePostContext();

  const redirect = useNavigate();

  useEffect(() => {
    async function getComments() {
      const commentsResponse = await getCommentsService(id, token, currentPage);
      setHasMore(commentsResponse.length);
      addComments(commentsResponse);
      setCommentLoading(false);
    }

    setCommentLoading(true)
    getComments();
  }, [currentPage])


  useEffect(() => {
    async function fetchPostById() {
      try {
        setLoading(true);
        const {post, isLiked} = await getPostByIdService(id, token);
        
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
  
  const sentinelRef = useRef();
  const sentinelElementRef = useCallback(node => {
    if(commentLoading) return;
    if(sentinelRef.current) sentinelRef.current.disconnect();

    console.log("callback")
    sentinelRef.current = new IntersectionObserver(entries => {
      console.log("observer")
      if(entries[0].isIntersecting && hasMore) {
        setCurrentPage(prev => prev+1);
      }
    })

    if(node) sentinelRef.current.observe(node)
  }, []);

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
      
      <div className="PostDetails-post-container">
        <PostCard 
          liked={isLiked}
          post={post}
          permissions={post.permissions}
          postUser={post.user}
        />
        {post?.permissions.canComment ?
          <CreatePost 
            type={"reply"}
            isCommentOfUser={post.user.tag}
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
          renderPosts(comments, null, true, sentinelElementRef)
        }
        {commentLoading && <Loading position="static"/>}
        {!hasMore && <AlertBox text={"Não foi possivel carregar mais posts"} icon={<BsXCircleFill/>} theme={""}/>}
      </div>
    </div>
  )
}

export default PostDetails