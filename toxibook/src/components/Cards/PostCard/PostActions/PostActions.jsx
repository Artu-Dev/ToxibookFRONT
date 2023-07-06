import { FaComments, FaShareAlt } from 'react-icons/fa';
import { TbRadioactiveFilled } from 'react-icons/tb';

import "./PostActions.css";

const PostActions = ({totalLikes, totalComments, totalShares, canComment, privatePost, onClick, postLiked}) => {
	return (
		<div className="bottomPost-container">
			<ul>
				<li className="postActions-like" onClick={onClick}>
					<i className={postLiked ? "selected" : ""}>
						<TbRadioactiveFilled />
					</i>
					{totalLikes}
				</li>
				{canComment && (
					<li className="postActions-comment">
						<i>
							<FaComments />
						</i>
						{totalComments}
					</li>
				)}
				{!privatePost && (
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