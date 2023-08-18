import "./Profile.css";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Layout/Loading/Loading";
import { useEffect, useRef, useState } from "react";
import { CropImage, getCroppedImg } from "../../components/CropImage/CropImage";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  followUserService,
  getUserService,
} from "../../services/user.services";
import { MdVerified } from "react-icons/md";
import { getPostsByUserService, getReplysByUserService } from "../../services/post.services";
import { renderPosts } from "../../functions/globalFunctions";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
import { ImageEditorInput } from "../../components/ImageEditorInput/ImageEditorInput";

const Profile = () => {
  const userID = useParams(window.location.href).id;
  const token = localStorage.getItem("AuthToken");

  const [isYourProfile, setIsYourProfile] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalFollowing, setTotalFollowing] = useState(0);
  const [userProfile, setUserProfile] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [croppedImagePfp, setCroppedImagePfp] = useState(null);
  const [croppedImageBanner, setCroppedImageBanner] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [aspect, setAspect] = useState(1 / 1);

  const inputImagePfp = useRef();
  const inputImageBannerRef = useRef();
  const user = JSON.parse(localStorage.getItem("User"));
  const redirect = useNavigate()


  useEffect(() => {
    async function fetchUser() {
      const userResponse = await getUserService(token, userID);

      setIsFollowingUser(userResponse.followInfo.followers.includes(user?._id));
      setIsYourProfile(user?._id === userID);

      setTotalFollowers(userResponse?.followInfo.totalFollowers);
      setTotalFollowing(userResponse?.followInfo.totalFollowing);

      setUserProfile(userResponse);
    }

    fetchPosts();
    fetchUser();
  }, []);

  async function fetchPosts() {
    const postsResponse = await getPostsByUserService(token, userID);
    setPosts(postsResponse);
    setLoading(false);
  }
  
  async function fetchReply() {
    const postsResponse = await getReplysByUserService(token, userID);
    setPosts(postsResponse);
    setLoading(false);
  }

  function processImage(aspect = 1 / 1, inputRef) {
    const imageSelected = inputRef.current.files[0];
    if (!/\.(jpe?g|png|gif|webp)$/i.test(imageSelected.name)) {
      alert("formato invalido");
      return false;
    }

    const objectFile = {
      imageFile: imageSelected,
      id: uniqueId(),
      name: imageSelected.name,
      readableSize: filesize(imageSelected.size),
      preview: URL.createObjectURL(imageSelected),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    };
    console.log(objectFile); 
    setAspect(aspect);
    setImageFile(objectFile);
    setShowCrop(true);

    inputImagePfp.current.value = null;
    inputImageBannerRef.current.value = null;
    // setMediaState((prevFilesState) => [...prevFilesState, uploadedFile]);
  }

  function handleCloseCrop() {
    setShowCrop(false);
    setImageFile(null);
  }

  async function handleFollowUser() {
    try {
      if (isFollowingUser) setTotalFollowers((prev) => Number(prev) - 1);
      else setTotalFollowers((prev) => Number(prev) + 1);
      setIsFollowingUser(!isFollowingUser);

      await followUserService(token, userID);
    } catch (error) {
      if (isFollowingUser) setTotalFollowers((prev) => Number(prev) + 1);
      else setTotalFollowers((prev) => Number(prev) - 1);
      setIsFollowingUser(!isFollowingUser);

      if(error.response.status === 401) {
        redirect("/login");
      }
    }
  }

  function handleFinishCrop(image) {
    if(aspect === 1 / 1) setCroppedImagePfp(image)
    else setCroppedImageBanner(image)
  }

  if (!userProfile) return <Loading />;
  return (
    <div className="profilePage-container centerFlex">
      <section className="profileDatas-container">
        <div className="profile-top-container">
          <div className="profile-banner">
            {croppedImageBanner &&
              (userProfile?.bannerImg && (
                <img
                  className="banner-picture-img"
                  src={croppedImageBanner || userProfile?.bannerImg}
                  alt="profile picture"
                />
              ))}
            {isYourProfile && (
              <ImageEditorInput
                id={"bannerImgInput"}
                ref={inputImageBannerRef}
                onChangeEvent={() => processImage(3 / 1, inputImageBannerRef)}
              />
            )}
          </div>
          <div className="profile-picture-container">
            {croppedImagePfp &&
              (userProfile?.profileImg && (
                <img
                  className="profile-picture-img"
                  src={croppedImagePfp || userProfile?.profileImg}
                  alt="profile picture"
                />
              ))}

            {isYourProfile && (
              <ImageEditorInput
                id={"profileImgInput"}
                ref={inputImagePfp}
                onChangeEvent={() => processImage(1 / 1, inputImagePfp)}
              />
            )}
          </div>
        </div>

        <div className="profile-bottom-cotainer">
          <div className="userInfo-container">
            <div className="userInfo-username">
              <h1 className="userInfo-name">
                {userProfile?.username}
                {userProfile?.verified && (
                  <span>
                    <MdVerified />
                  </span>
                )}
              </h1>
              <h2 className="userInfo-tag">@{userProfile?.tag}</h2>
            </div>
            <div className="userInfo-bio">
              <p>{userProfile?.bio}</p>
            </div>
            <div className="userInfo-follows">
              <p>
                {totalFollowing} <span>Seguindo</span>
              </p>
              <p>
                {totalFollowers} <span>Seguidores</span>
              </p>
            </div>
          </div>
          {isYourProfile ? (
            <button className="profile-infoBtn edit">
              Editar Perfil
              <span>
                <HiPencilSquare />
              </span>
            </button>
          ) : (
            <label htmlFor="isFollowingBtn" className="profile-infoBtn">
              {!isFollowingUser ? "Follow" : "Unfollow"}
              <input
                type="checkbox"
                id="isFollowingBtn"
                checked={isFollowingUser}
                onChange={handleFollowUser}
              />
              <span>{isFollowingUser ? <HiUserRemove /> : <HiUserAdd />}</span>
            </label>
          )}
        </div>
        <Navbar
          onOption1={() => fetchPosts()}
          onOption2={() => fetchReply()}
          radio1={"Posts"}
          radio2={"Respostas"}
          position={"relative"}
          background={"#050505"}
        />
      </section>
      <section className="profile-posts">
        {posts && renderPosts(posts, [], loading)}
      </section>

      {showCrop && (
        <div className="cropImage-container">
          <CropImage
            onCancel={() => handleCloseCrop()}
            onFinish={handleFinishCrop}
            imageFile={imageFile?.preview}
            aspect={aspect}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
