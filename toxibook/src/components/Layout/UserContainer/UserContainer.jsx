import { Link } from "react-router-dom";
import {MdVerified} from "react-icons/md";

const UserContainer = ({user, verified}) => {
  if(!user || !!user.length) return 
  return (
    <Link to={`/profile/${user._id}`} className="userContainer-link" onClick={(e) => e.stopPropagation()}>
      <div className="userContainer">
        <img src={user.profileImg} alt="user profile picture" />
        <span>
          <p className={`username ${user?.verified ? "verified" : ""}`}>
            {user.username}
            {verified &&
              <span><MdVerified /></span>
            }
          </p>
          <p className="tag">{user.tag}</p>
        </span>
      </div>
    </Link>
  );
}

export default UserContainer