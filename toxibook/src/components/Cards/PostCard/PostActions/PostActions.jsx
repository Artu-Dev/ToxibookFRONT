import { FaComments, FaShareAlt } from 'react-icons/fa';
import { TbRadioactiveFilled } from 'react-icons/tb';

import "./PostActions.css";
import { AuthUserContext } from '../../../../contexts/AuthUser';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { likePostService } from '../../../../services/post.services';

const PostActions = ({liked, post, permissions}) => {
	const navigate = useNavigate();
	const {signed} = useContext(AuthUserContext);
  const token = localStorage.getItem("AuthToken");

  const [totalLikes, setTotalLikes] = useState(post.totalLikes);
  const [totalShares, setTotalShares] = useState(post.totalShares);
  const [totalComments, setTotalComments] = useState(post.totalComments);
  const [postLiked, setPostLiked] = useState(liked);


	async function handleLikePost(event) {
    event.stopPropagation();
    if(!signed) return navigate("/login")

		try {
			if (postLiked) {
				setTotalLikes((prev) => prev - 1);
			} else {
				setTotalLikes((prev) => prev + 1);
			}
			setPostLiked(!postLiked);
			
			const likeResponse = await likePostService(post._id, token);
			setTotalLikes(likeResponse.totalLikes);
		} catch (error) {

			setPostLiked(postLiked);
			if (!postLiked) {
				setTotalLikes((prev) => prev - 1);
			} else {
				setTotalLikes((prev) => prev + 1);
			}
		}
  }


	return (
		<div className="bottomPost-container">
			<ul>
				<li className="postActions-like" onClick={handleLikePost}>
					<i className={postLiked ? "selected" : ""}>
						<TbRadioactiveFilled />
					</i>
					{totalLikes}
				</li>
				{permissions.canComment && (
					<li className="postActions-comment">
						<i>
							<FaComments />
						</i>
						{totalComments}
					</li>
				)}
				{!permissions.privatePost && (
					<li className="postActions-share">
						<i>
							<FaShareAlt />
						</i>
						{totalShares}
					</li>
				)}
			</ul>
		</div>
  );
}

export default PostActions