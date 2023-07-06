import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import PostCard from "../../../components/Cards/PostCard/PostCard"

import { getPostByIdService } from "../../../services/post.services";

const PostDetails = () => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const { id } = useParams("id");

  useEffect(() => {
    async function fetchPostById() {
      try {
        const responsePost = await getPostByIdService(id);
        setPost(responsePost);

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

  return (
    <div>
      {post.length !== 0 &&
        <PostCard 
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
          />
        ))
      }
    </div>
  )
}

export default PostDetails