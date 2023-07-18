import { useNavigate } from 'react-router-dom'
import { formateDate1 } from '../../../functions/FormateDate'
import UserContainer from '../../Layout/UserContainer/UserContainer'

import "./PostMin.css"

const PostMin = ({username, tag, userPFP, date, postText, postImg, postId, userId}) => {
  const navigate = useNavigate(); 

  function handleClickMinPost(event) {
    event.stopPropagation();
    navigate(`/post/${postId}`)
  }

  return (
    <div className="postMin-container" onClick={(event) => handleClickMinPost(event)}>
      <div className="postMin-top">
        <UserContainer 
          id={userId}
          userPFP={userPFP}
          username={username}
          tag={tag}
        />
        <p>{formateDate1(date)}</p>
      </div>
      <div 
        className="postMin-content"
      >
        {postText &&
          <p>{postText}</p>
        }
        {postImg &&
          <img src={postImg} alt="post"/>
        }
      </div>
    </div>
  )
}

export default PostMin