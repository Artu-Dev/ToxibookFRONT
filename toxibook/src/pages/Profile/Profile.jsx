import "./Profile.css";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { HiPencilSquare, HiUser } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard/PostCard";
import { useEffect, useRef, useState } from "react";
import { CropImage, getCroppedImg } from "../../components/CropImage/CropImage";

const Profile = ({username, tag, bio, followers, following, bannerImg, profileImg, isYourProfile = true, isFollowing = false}) => {
	const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);

  const [imageFile, setImageFile] = useState(null);
  const [croppedImagePfp, setCroppedImagePfp] = useState(null);
  const [croppedImageBanner, setCroppedImageBanner] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({width: 0, height: 1});
  const [croppedArea, setCroppedArea] = useState({width: 0, height: 1});
  const [showCrop, setShowCrop] = useState(false);
  const [aspect, setAspect] = useState(1 / 1);

	const inputImagePfp = useRef();
	const inputImageBannerRef = useRef();

	useEffect(() => {
		if(croppedArea.height === croppedArea.width) {
			setCroppedImagePfp(imageFile)
			setShowCrop(false);
		}
	}, [croppedArea])
	

	async function showCroppedImage() {
		const imageCropped = await getCroppedImg(imageFile, croppedAreaPixels)
		if(aspect === 1 / 1) {
			setCroppedImagePfp(imageCropped);
		} else {
			setCroppedImageBanner(imageCropped);
		}
		handleCloseCrop();
	}

	function handleSelectImages(aspect = 1 / 1, inputRef) {
		const image = inputRef.current.files[0];
		setAspect(aspect)

		if (!(/\.(jpe?g|png|gif|webp)$/i.test(image.name))) {
			alert("formato invalido")
			return false;
		}

		const reader = new FileReader();
		reader.onload = function() {
			setImageFile(reader.result);
			setShowCrop(true);
			inputImagePfp.current.value = null
			inputImageBannerRef.current.value = null
		}
	
		reader.readAsDataURL(image);
	}

	function handleCloseCrop() {
		setShowCrop(false);
		setImageFile(null);
	}
	
	return (
    <div className="profilePage-container centerFlex">
      <section className="profileDatas-container">
        <div className="profile-top-container">
          <div
            className="profile-banner"
          >
            {isYourProfile && (
              <>
                {croppedImageBanner && (
                  <img
                    className="banner-picture-img"
                    src={croppedImageBanner}
                    alt="profile picture"
                  />
                )}

                <input
                  id="bannerImgInput"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  ref={inputImageBannerRef}
                  onChange={() =>
                    handleSelectImages(3 / 1, inputImageBannerRef)
                  }
                />
                <label htmlFor="bannerImgInput centerFlex">
                  <HiPencilSquare />
                </label>
              </>
            )}
          </div>
          <div
            className="profile-picture-container"
            style={{
              backgroundImage: `url("https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg")`,
            }}
          >
            {croppedImagePfp && (
              <img
                className="profile-picture-img"
                src={croppedImagePfp}
                alt="profile picture"
                onClick={handleImageClick}
              />
            )}

            {isYourProfile && (
              <label htmlFor="pfpImageInput">
                <HiPencilSquare />
              </label>
            )}
            <input
              id="pfpImageInput"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              ref={inputImagePfp}
              onChange={() => handleSelectImages(1 / 1, inputImagePfp)}
            />
          </div>
        </div>

        <div className="profile-bottom-cotainer">
          <div className="userInfo-container">
            <div className="userInfo-username">
              <h1 className="userInfo-name">Cadrado</h1>
              <h2 className="userInfo-tag">@Cadrado</h2>
            </div>

            <div className="userInfo-bio">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
                nulla totam animi inventore, eveniet quae maiores laborum.
                Quidem, earum?
              </p>
            </div>

            <div className="userInfo-follows">
              <p>
                1.211 <span>Seguindo</span>
              </p>
              <p>
                332.594 <span>Seguidores</span>
              </p>
            </div>
          </div>
          {!isYourProfile && (
            <label htmlFor="isFollowingBtn" className="profile-infoBtn">
              {!isFollowingUser ? "Follow" : "Unfollow"}
              <input
                type="checkbox"
                id="isFollowingBtn"
                checked={isFollowingUser}
                onChange={() => setIsFollowingUser(!isFollowingUser)}
              />
              <span>{isFollowingUser ? <HiUserRemove /> : <HiUserAdd />}</span>
            </label>
          )}

          {isYourProfile && (
            <button className="profile-infoBtn edit">
              Editar Perfil
              <span>
                <HiPencilSquare />
              </span>
            </button>
          )}
        </div>
				<Navbar
					radio1={"Posts"}
					radio2={"Respostas"}
					position={"relative"}
					background={"#050505"}
				/>
      </section>
      <section className="profile-posts">
        <PostCard
          liked={true}
          post={{
            _id: { $oid: "647b74bd6d566dbf0cbe869c" },
            user: { $oid: "64782ff407f14a9bbf4ca2d6" },
            textContent: "publico e nao pode comentar",
            imageContent:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6UiaZQxZ2DIDpK3L5autlrvi6y1Eg_5c9Gj9QCYq9w&s",
            totalShares: 5,
            likesList: ["64782ff407f14a9bbf4ca2d6", "649f22789524c6e7e262861f"],
            totalLikes: 5,
            totalComments: 0,
            createdAt: 1685812283004,
            permissions: { $oid: "647b74bd6d566dbf0cbe86a0" },
            shares: { $oid: "647b74bd6d566dbf0cbe869e" },
          }}
          permissions={{
            _id: { $oid: "647b74bd6d566dbf0cbe86a0" },
            post: { $oid: "647b74bd6d566dbf0cbe869c" },
            canComment: false,
            privatePost: false,
          }}
          user={{
            _id: { $oid: "64782ff407f14a9bbf4ca2d6" },
            username: "Cadrado",
            tag: "Kdrado",
            bio: "simplesmente o ser mais perfeito dessa rede social",
            email: "cadrado@penis.com",
            password:
              "$2a$10$ErS7EDr6KGWNIi9Okyvk3uUGSYf8F5nRObc886kQGgtDaTLdijN8q",
            createdAt: { $date: { $numberLong: "1685598188197" } },
            followInfo: { $oid: "64782ff507f14a9bbf4ca2d8" },
            posts: [
              { $oid: "6478306b07f14a9bbf4ca2e2" },
              { $oid: "6478de3c4f1167f8dd1fdccd" },
              { $oid: "647b74bd6d566dbf0cbe869c" },
              { $oid: "647b74cd6d566dbf0cbe86a8" },
              { $oid: "647b74d96d566dbf0cbe86b4" },
              { $oid: "647b74e66d566dbf0cbe86c0" },
              { $oid: "647ba45ea5a6a7e73c4c3f5c" },
              { $oid: "647bc2472d0b1ff3c97bb71b" },
            ],
            profileImg:
              "https://i.pinimg.com/236x/0d/09/03/0d09039b4b211bf12d90722fd2405258.jpg",
          }}
        />
        <PostCard
          liked={true}
          post={{
            _id: { $oid: "647b74bd6d566dbf0cbe869c" },
            user: { $oid: "64782ff407f14a9bbf4ca2d6" },
            textContent: "publico e nao pode comentar",
            imageContent: "https://cdn.wallpapersafari.com/62/48/4KQeDu.png",
            isCommentOf: {
              id: "64782ff407f14a9bbf4ca2d6",
              user: { tag: "tagname" },
            },
            totalShares: 5,
            likesList: ["64782ff407f14a9bbf4ca2d6", "649f22789524c6e7e262861f"],
            totalLikes: 5,
            totalComments: 0,
            createdAt: 1685812283004,
            permissions: { $oid: "647b74bd6d566dbf0cbe86a0" },
            shares: { $oid: "647b74bd6d566dbf0cbe869e" },
          }}
          permissions={{
            _id: { $oid: "647b74bd6d566dbf0cbe86a0" },
            post: { $oid: "647b74bd6d566dbf0cbe869c" },
            canComment: true,
            privatePost: false,
          }}
          user={{
            _id: { $oid: "64782ff407f14a9bbf4ca2d6" },
            username: "Cadrado",
            tag: "Kdrado",
            bio: "simplesmente o ser mais perfeito dessa rede social",
            email: "cadrado@penis.com",
            createdAt: { $date: { $numberLong: "1685598188197" } },
            followInfo: { $oid: "64782ff507f14a9bbf4ca2d8" },
            posts: [
              { $oid: "6478306b07f14a9bbf4ca2e2" },
              { $oid: "6478de3c4f1167f8dd1fdccd" },
              { $oid: "647b74bd6d566dbf0cbe869c" },
              { $oid: "647b74cd6d566dbf0cbe86a8" },
              { $oid: "647b74d96d566dbf0cbe86b4" },
              { $oid: "647b74e66d566dbf0cbe86c0" },
              { $oid: "647ba45ea5a6a7e73c4c3f5c" },
              { $oid: "647bc2472d0b1ff3c97bb71b" },
            ],
            profileImg:
              "https://i.pinimg.com/236x/0d/09/03/0d09039b4b211bf12d90722fd2405258.jpg",
          }}
        />
        <PostCard
          liked={true}
          post={{
            _id: { $oid: "647b74bd6d566dbf0cbe869c" },
            user: { $oid: "64782ff407f14a9bbf4ca2d6" },
            textContent: "publico e nao pode comentar",
            totalShares: 5,
            likesList: ["64782ff407f14a9bbf4ca2d6", "649f22789524c6e7e262861f"],
            totalLikes: 5,
            totalComments: 0,
            createdAt: 1685812283004,
            permissions: { $oid: "647b74bd6d566dbf0cbe86a0" },
            shares: { $oid: "647b74bd6d566dbf0cbe869e" },
          }}
          permissions={{
            _id: { $oid: "647b74bd6d566dbf0cbe86a0" },
            post: { $oid: "647b74bd6d566dbf0cbe869c" },
            canComment: false,
            privatePost: false,
          }}
          user={{
            _id: { $oid: "64782ff407f14a9bbf4ca2d6" },
            username: "Cadrado",
            tag: "Kdrado",
            bio: "simplesmente o ser mais perfeito dessa rede social",
            email: "cadrado@penis.com",
            password:
              "$2a$10$ErS7EDr6KGWNIi9Okyvk3uUGSYf8F5nRObc886kQGgtDaTLdijN8q",
            createdAt: { $date: { $numberLong: "1685598188197" } },
            followInfo: { $oid: "64782ff507f14a9bbf4ca2d8" },
            posts: [
              { $oid: "6478306b07f14a9bbf4ca2e2" },
              { $oid: "6478de3c4f1167f8dd1fdccd" },
              { $oid: "647b74bd6d566dbf0cbe869c" },
              { $oid: "647b74cd6d566dbf0cbe86a8" },
              { $oid: "647b74d96d566dbf0cbe86b4" },
              { $oid: "647b74e66d566dbf0cbe86c0" },
              { $oid: "647ba45ea5a6a7e73c4c3f5c" },
              { $oid: "647bc2472d0b1ff3c97bb71b" },
            ],
            profileImg:
              "https://i.pinimg.com/236x/0d/09/03/0d09039b4b211bf12d90722fd2405258.jpg",
          }}
        />
      </section>

      {showCrop && (
        <div className="cropImage-container">
          <CropImage
            imageSrc={imageFile}
            setCroppedAreaPixels={setCroppedAreaPixels}
            setCroppedArea={setCroppedArea}
            aspect={aspect}
          />
          <button style={{ zIndex: 1 }} onClick={showCroppedImage}>
            finish
          </button>
          <button style={{ zIndex: 1 }} onClick={handleCloseCrop}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile