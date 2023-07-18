import { Link } from "react-router-dom";
import "./UserContainer.css"

import {MdVerified} from "react-icons/md";

const UserContainer = ({userPFP, username, tag, verified, id}) => {
  return (
    <Link to={`/profile/${id}`} className="userContainer-link" onClick={(e) => e.stopPropagation()}>
      <div className="userContainer">
        <img src={userPFP} alt="user profile picture" />
        <span>
          <p className={`username ${verified ? "verified" : ""}`}>
            {username}
            {verified &&
              <span><MdVerified /></span>
            }
          </p>
          <p className="tag">{tag}</p>
        </span>
      </div>
    </Link>
  );
}

export default UserContainer