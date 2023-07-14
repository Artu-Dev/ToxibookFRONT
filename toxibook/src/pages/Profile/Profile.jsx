import "./Profile.css";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard/PostCard";
import Loading from "../../components/Layout/Loading/Loading";
import { useEffect, useRef, useState } from "react";
import { CropImage, getCroppedImg } from "../../components/CropImage/CropImage";
import { useParams } from "react-router-dom";
import { getUserService } from "../../services/user.services";
import { MdVerified } from "react-icons/md";

const Profile = ({isYourProfile = false, isFollowing = false}) => {
  const userID = useParams(window.location.href).id;
  const token = localStorage.getItem("AuthToken")

	const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);

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
    async function fetchUser() {
      const userResponse = await getUserService(token, userID);
      setUser(userResponse)
    }
    fetchUser();

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

  if(!user) return <Loading />
	return (
    <div className="profilePage-container centerFlex">
      <section className="profileDatas-container">
        <div className="profile-top-container">
          <div
            className="profile-banner"
          >
            {croppedImageBanner || user?.bannerImg  && (
              <img
                className="banner-picture-img"
                src={croppedImageBanner || user?.bannerImg}
                alt="profile picture"
              />
            )}
            {isYourProfile && (
              <>
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
          <div className="profile-picture-container">
            {croppedImagePfp || user?.profileImg && (
              <img
                className="profile-picture-img"
                src={croppedImagePfp || user?.profileImg}
                alt="profile picture"
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
              <h1 className="userInfo-name">{user?.username} 
                {Boolean(user?.verified) &&
                  <span><MdVerified /></span>
                }
              </h1>
              <h2 className="userInfo-tag">@{user?.tag}</h2>
            </div>

            <div className="userInfo-bio">
              <p>{user?.bio}</p>
            </div>

            <div className="userInfo-follows">
              <p>
                {user?.followInfo.totalFollowing} <span>Seguindo</span>
              </p>
              <p>
                {user?.followInfo.totalFollowers} <span>Seguidores</span>
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