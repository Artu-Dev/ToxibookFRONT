import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import PostCard from "../../../components/Cards/PostCard/PostCard"

import { getPostByIdService } from "../../../services/post.services";
import Loading from "../../../components/Layout/Loading/Loading" 

const PostDetails = () => {
  const [post, setPost] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("AuthToken");

  const { id } = useParams("id");

  // console.log(post);

  useEffect(() => {
    async function fetchPostById() {
      try {
        const responsePost = await getPostByIdService(id, token);
        console.log(responsePost); 
        setIsLiked(responsePost.isLiked.length)
        setPost(responsePost.post);

        const commentPromises = responsePost.comments.map(commentId => {
          return getPostByIdService(commentId);
        });

        const commentsResponse = await Promise.all(commentPromises);
        setComments(commentsResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPostById();
  }, [id]);

  if(post.length === 0) return <Loading/>
  return (
    <div>
      {post.length !== 0 &&
        <PostCard 
          liked={isLiked}
          post={post}
          permissions={post.permissions}
          user={post.user}
        />
      }
      {comments.length !== 0 &&
        comments.map((item) => (
          <PostCard 
            key={item._id}
            post={item}
            permissions={item.permissions}
            user={item.user}
            type={"comment"}
            // liked={item.}
          />
        ))
      }
    </div>
  )
}

export default PostDetails