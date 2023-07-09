import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import "./Profile.css";
import { HiPencilSquare } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard/PostCard";

const Profile = ({username, tag, bio, followers, following, bannerImg, profileImg, isYourProfile = false, isFollowing = false}) => {
	return (
		<div className="profilePage-container">
			<section className="profileDatas-container">
				<div className="profile-top-container">
					<div className="profile-banner"
						style={{
							backgroundImage: `url("https://cdn.wallpapersafari.com/62/48/4KQeDu.png")`
						}}
					>
						<i><HiPencilSquare/></i>
					</div>
					<div className="profile-picture"
						style={{
							backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6UiaZQxZ2DIDpK3L5autlrvi6y1Eg_5c9Gj9QCYq9w&s")`
						}}
					>
						<i><HiPencilSquare/></i>
					</div>
				</div>

				<div className="profile-bottom-cotainer">
						<div className="userInfo-container">
							<div className="userInfo-username">
								<h1 className="userInfo-name">Cadrado</h1>
								<h2 className="userInfo-tag">@Cadrado</h2>
							</div>

							<div className="userInfo-bio">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi nulla totam animi inventore, eveniet quae maiores laborum. Quidem, earum?</p>
							</div>

							<div className="userInfo-follows">
								<p>1.211 <span>Seguindo</span></p>
								<p>332.594 <span>Seguidores</span></p>
							</div>

						</div>
						{isYourProfile ?
							<button>Follow <span><HiUserAdd/></span></button>
							:
							<button>Unfollow <span><HiUserRemove/></span></button>
						}
				</div>
			</section>
			<Navbar 
				radio1={"Posts"}
				radio2={"Respostas"}
				position={"relative"}
				background={"#050505"}
			/>
			<section className="profile-posts">
				<PostCard 
					liked={true}
					post={
						{"_id":{"$oid":"647b74bd6d566dbf0cbe869c"},"user":{"$oid":"64782ff407f14a9bbf4ca2d6"},"textContent":"publico e nao pode comentar","totalShares": 5,"likesList":["64782ff407f14a9bbf4ca2d6","649f22789524c6e7e262861f"],"totalLikes": 5,"totalComments": 0,"createdAt": 1685812283004,"permissions":{"$oid":"647b74bd6d566dbf0cbe86a0"},"shares":{"$oid":"647b74bd6d566dbf0cbe869e"}}
					}
					permissions={
						{"_id":{"$oid":"647b74bd6d566dbf0cbe86a0"},"post":{"$oid":"647b74bd6d566dbf0cbe869c"},"canComment":false,"privatePost":false}
					}
					user={
						{"_id":{"$oid":"64782ff407f14a9bbf4ca2d6"},"username":"Cadrado","tag":"Kdrado","bio":"simplesmente o ser mais perfeito dessa rede social","email":"cadrado@penis.com","password":"$2a$10$ErS7EDr6KGWNIi9Okyvk3uUGSYf8F5nRObc886kQGgtDaTLdijN8q","createdAt":{"$date":{"$numberLong":"1685598188197"}},"followInfo":{"$oid":"64782ff507f14a9bbf4ca2d8"},"posts":[{"$oid":"6478306b07f14a9bbf4ca2e2"},{"$oid":"6478de3c4f1167f8dd1fdccd"},{"$oid":"647b74bd6d566dbf0cbe869c"},{"$oid":"647b74cd6d566dbf0cbe86a8"},{"$oid":"647b74d96d566dbf0cbe86b4"},{"$oid":"647b74e66d566dbf0cbe86c0"},{"$oid":"647ba45ea5a6a7e73c4c3f5c"},{"$oid":"647bc2472d0b1ff3c97bb71b"}],"profileImg":"https://i.pinimg.com/236x/0d/09/03/0d09039b4b211bf12d90722fd2405258.jpg"}
					}
				/>
				<PostCard 
					liked={true}
					post={
						{"_id":{"$oid":"647b74bd6d566dbf0cbe869c"},"user":{"$oid":"64782ff407f14a9bbf4ca2d6"},"textContent":"publico e nao pode comentar","totalShares": 5,"likesList":["64782ff407f14a9bbf4ca2d6","649f22789524c6e7e262861f"],"totalLikes": 5,"totalComments": 0,"createdAt": 1685812283004,"permissions":{"$oid":"647b74bd6d566dbf0cbe86a0"},"shares":{"$oid":"647b74bd6d566dbf0cbe869e"}}
					}
					permissions={
						{"_id":{"$oid":"647b74bd6d566dbf0cbe86a0"},"post":{"$oid":"647b74bd6d566dbf0cbe869c"},"canComment":false,"privatePost":false}
					}
					user={
						{"_id":{"$oid":"64782ff407f14a9bbf4ca2d6"},"username":"Cadrado","tag":"Kdrado","bio":"simplesmente o ser mais perfeito dessa rede social","email":"cadrado@penis.com","password":"$2a$10$ErS7EDr6KGWNIi9Okyvk3uUGSYf8F5nRObc886kQGgtDaTLdijN8q","createdAt":{"$date":{"$numberLong":"1685598188197"}},"followInfo":{"$oid":"64782ff507f14a9bbf4ca2d8"},"posts":[{"$oid":"6478306b07f14a9bbf4ca2e2"},{"$oid":"6478de3c4f1167f8dd1fdccd"},{"$oid":"647b74bd6d566dbf0cbe869c"},{"$oid":"647b74cd6d566dbf0cbe86a8"},{"$oid":"647b74d96d566dbf0cbe86b4"},{"$oid":"647b74e66d566dbf0cbe86c0"},{"$oid":"647ba45ea5a6a7e73c4c3f5c"},{"$oid":"647bc2472d0b1ff3c97bb71b"}],"profileImg":"https://i.pinimg.com/236x/0d/09/03/0d09039b4b211bf12d90722fd2405258.jpg"}
					}
				/>
				<PostCard 
					liked={true}
					post={
						{"_id":{"$oid":"647b74bd6d566dbf0cbe869c"},"user":{"$oid":"64782ff407f14a9bbf4ca2d6"},"textContent":"publico e nao pode comentar","totalShares": 5,"likesList":["64782ff407f14a9bbf4ca2d6","649f22789524c6e7e262861f"],"totalLikes": 5,"totalComments": 0,"createdAt": 1685812283004,"permissions":{"$oid":"647b74bd6d566dbf0cbe86a0"},"shares":{"$oid":"647b74bd6d566dbf0cbe869e"}}
					}
					permissions={
						{"_id":{"$oid":"647b74bd6d566dbf0cbe86a0"},"post":{"$oid":"647b74bd6d566dbf0cbe869c"},"canComment":false,"privatePost":false}
					}
					user={
						{"_id":{"$oid":"64782ff407f14a9bbf4ca2d6"},"username":"Cadrado","tag":"Kdrado","bio":"simplesmente o ser mais perfeito dessa rede social","email":"cadrado@penis.com","password":"$2a$10$ErS7EDr6KGWNIi9Okyvk3uUGSYf8F5nRObc886kQGgtDaTLdijN8q","createdAt":{"$date":{"$numberLong":"1685598188197"}},"followInfo":{"$oid":"64782ff507f14a9bbf4ca2d8"},"posts":[{"$oid":"6478306b07f14a9bbf4ca2e2"},{"$oid":"6478de3c4f1167f8dd1fdccd"},{"$oid":"647b74bd6d566dbf0cbe869c"},{"$oid":"647b74cd6d566dbf0cbe86a8"},{"$oid":"647b74d96d566dbf0cbe86b4"},{"$oid":"647b74e66d566dbf0cbe86c0"},{"$oid":"647ba45ea5a6a7e73c4c3f5c"},{"$oid":"647bc2472d0b1ff3c97bb71b"}],"profileImg":"https://i.pinimg.com/236x/0d/09/03/0d09039b4b211bf12d90722fd2405258.jpg"}
					}
				/>
			</section>
		</div>
	)
}

export default Profile