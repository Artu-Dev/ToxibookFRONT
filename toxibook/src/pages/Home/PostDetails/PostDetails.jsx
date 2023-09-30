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
import { HiArrowLeft } from "react-icons/hi2";
import { BsXCircleFill } from "react-icons/bs";
import Sentinel from "../../../components/Sentinel/Sentinel";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams("id");
  const token = localStorage.getItem("AuthToken");
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const hasMoreRef = useRef(true);
  const loadingCommentsRef = useRef(false);

  async function getComments() {
    loadingCommentsRef.current = true;
    const commentsResponse = await getCommentsService(id, token, currentPage);
    hasMoreRef.current = commentsResponse.length === 10;

    setComments(prev => [...prev, ...commentsResponse]);
    
    loadingCommentsRef.current = false;
  }

  useEffect(() => {
    loadingCommentsRef.current = true;
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


  if (loading) return <Loading />;
  if(!post) return <p>Post não encontrado!</p>
  return (
    <div className="PostDetails-Container centerFlex">
      <NavSide/>

      <div className="simpleNavBar">
        <div>
          <div className="backButton" onClick={() => navigate("..", "..", {relative: "path"})}>
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
          renderPosts(comments, null, true, loadingCommentsRef.current)
        }
        {loadingCommentsRef.current && <Loading position="static"/>}
        {!hasMoreRef.current && <AlertBox text={"Não foi possivel carregar mais posts"} icon={<BsXCircleFill/>} theme={""}/>}

        <Sentinel 
          hasMore={hasMoreRef}
          loading={loadingCommentsRef}
          incrementPage={() => setCurrentPage(prev => prev+1)}
        />
      </div>
    </div>
  )
}

export default PostDetails