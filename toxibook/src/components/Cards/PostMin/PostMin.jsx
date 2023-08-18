import { useNavigate } from 'react-router-dom'
import { formateDate1 } from '../../../functions/FormateDate'
import UserContainer from '../../Layout/UserContainer/UserContainer'

import "./PostMin.css"

const PostMin = ({post, user}) => {
  const navigate = useNavigate(); 

  function handleClickMinPost(event) {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/post/${post._id}`)
  }

  return (
    <div className="postMin-container" onClick={handleClickMinPost}>
      <div className="postMin-top">
        <UserContainer 
          user={user}
          verified={user?.verified}
        />
        <p>{formateDate1(post.createdAt)}</p>
      </div>
      <div 
        className="postMin-content"
      >
        {post.textContent &&
          <p>{post.textContent}</p>
        }
        {post.imageContent &&
          <img src={post.imageContent} alt="post"/>
        }
      </div>
    </div>
  )
}

export default PostMin