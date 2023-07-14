import "./UserContainer.css"

import {MdVerified} from "react-icons/md";

const UserContainer = ({userPFP, username, tag, verified}) => {
  return (
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
  );
}

export default UserContainer