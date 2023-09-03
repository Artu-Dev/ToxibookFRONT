import "./Profile.css";
import { HiArrowLeft, HiUserAdd, HiUserRemove } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Layout/Loading/Loading";
import { useEffect, useRef, useState } from "react";
import { CropImage } from "../../components/CropImage/CropImage";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateUserDatasService,
  followUserService,
  getUserService,
} from "../../services/user.services";
import { MdVerified } from "react-icons/md";
import { getPostsByUserService, getReplysByUserService } from "../../services/post.services";
import { renderPosts } from "../../functions/globalFunctions";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
import { ImageEditorInput } from "../../components/ImageEditorInput/ImageEditorInput";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import Message from "../../components/Layout/Message/Message";
import { usePostContext } from "../../contexts/PostContext";

const Profile = () => {
  const userID = useParams(window.location.href).id;
  const token = localStorage.getItem("AuthToken");
  const user = JSON.parse(localStorage.getItem("User"));

  const {posts, setPost} = usePostContext();

  const [isYourProfile, setIsYourProfile] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalFollowing, setTotalFollowing] = useState(0);
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [aspect, setAspect] = useState(1 / 1);

  const inputImagePfp = useRef(); 
  const inputImageBannerRef = useRef();
  const redirect = useNavigate();

  useEffect(() => {   
    setIsYourProfile(user?._id === userID);
    fetchPostOrReply();
    fetchUser();
  }, [userID]); 
  
  async function fetchUser() {
    const userResponse = await getUserService(token, userID);
    updateProfileInfos(userResponse);
  }

  function updateProfileInfos(userData) {
    setTotalFollowers(userData?.followInfo.totalFollowers);
    setTotalFollowing(userData?.followInfo.totalFollowing);
    setUserProfile(userData);
    setIsFollowingUser(userData.followInfo.followers.includes(user?._id));
  }
  
  async function fetchPostOrReply(latest = false) {
    setLoading(true);
    setPost([]);

    let postsResponse;
    if(latest) {
      postsResponse = await getReplysByUserService(token, userID);
    } else {
      postsResponse = await getPostsByUserService(token, userID);
    }
    
    setPost(postsResponse);
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

  async function handleFinishCrop(image) {
    const data = new FormData();
    if(aspect === 1/1) {
      data.append("profileImg", image);
    } else {
      data.append("bannerImg", image);
    }

    for (let entry of data.entries()) {
      console.log(entry);
    }

    const newUser = await updateUserDatasService(token, user._id, data);
    localStorage.setItem("User", JSON.stringify(newUser));
    handleCloseCrop();
    updateProfileInfos(newUser);
  }

  function handleBack() {
    redirect("/");
  }

  function renderUserInfo() {
    return (
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
    );
  } 


  if (!userProfile) return <Loading />;
  return (
    <div className="profilePage-container centerFlex">
      {showEditModal &&
        <EditProfileModal
          onUpdateDatas={(data) => setUserProfile(data)}
          closeModal={() => setShowEditModal(false)}
        />
      }
      {/* <Message /> */}
      <section className="profileDatas-container">

        <span className="backbutton" onClick={handleBack}>
          <HiArrowLeft/>
        </span>

        <div className="profile-top-container">
          <div className="profile-banner">
            {userProfile?.bannerImg && (
                <img
                  className="banner-picture-img"
                  src={userProfile?.bannerImg}
                  alt="profile picture"
                />
              )}
            {isYourProfile && (
              <ImageEditorInput
                id={"bannerImgInput"}
                ref={inputImageBannerRef}
                onChangeEvent={() => processImage(3 / 1, inputImageBannerRef)}
              />
            )}
          </div>
          <div className="profile-picture-container">
            {userProfile?.profileImg &&  (
                <img
                  className="profile-picture-img"
                  src={userProfile?.profileImg}
                  alt="profile picture"
                />
              )}

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
          {renderUserInfo()}

          {isYourProfile ? (
            <button className="profile-infoBtn edit" onClick={() => setShowEditModal(true)}>
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
          onOption1={() => fetchPostOrReply()}
          onOption2={() => fetchPostOrReply(true)}
          radio1={"Posts"}
          radio2={"Respostas"}
          position={"relative"}
          background={"#050505"}
        />

      </section>

      <section className="profile-posts">
        {posts && renderPosts(posts, [], loading, null)}
      </section>

      {showCrop && (
        <div className="cropImage-container">
          <CropImage
            imageName={user.tag}
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
