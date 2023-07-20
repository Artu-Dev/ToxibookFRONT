import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import PostCard from "../../../components/Cards/PostCard/PostCard"

import { getPostByIdService } from "../../../services/post.services";
import Loading from "../../../components/Layout/Loading/Loading" 
import CreatePost from "../../../components/CreatePost/CreatePost";
import "./PostDetails.css"

const PostDetails = () => {
  const [post, setPost] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const { id } = useParams("id");
  const token = localStorage.getItem("AuthToken");
  const userLocalStorage = JSON.parse(localStorage.getItem("User"));

  // console.log(post);

  useEffect(() => {
    async function fetchPostById() {
      try {
        const {post, isLiked} = await getPostByIdService(id, token);
        console.log({isLiked, post}); 
        setIsLiked(isLiked.length)
        setPost(post);

        const commentPromises = post.comments.map(commentId => {
          return getPostByIdService(commentId, token);
        });

        const commentsResponse = await Promise.all(commentPromises);
        console.log(commentsResponse);
        setComments(commentsResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPostById();
  }, [id]);

  if(post.length === 0) return <Loading/>
  return (
    <div className="PostDetails-Container centerFlex">
      {post.length !== 0 &&
        <PostCard 
          liked={isLiked}
          post={post}
          permissions={post.permissions}
          user={post.user}
        />
      }
      {post?.permissions.canComment &&
        <CreatePost 
          type={"reply"}
          token={token}
          setPostList={(itemPost) => setComments(prev => [itemPost, ...prev])}
          isCommentOf={post.user.tag}
          isCommentOfID={post._id}
          user={userLocalStorage}
        />
      }
      {comments.length !== 0 &&
        comments.map(({post, isLiked}) => (
          <PostCard 
            key={post._id}
            post={post}
            permissions={post.permissions}
            user={post.user}
            type={"comment"}
            liked={isLiked === post._id}
          />
        ))
      }
    </div>
  )
}

export default PostDetails