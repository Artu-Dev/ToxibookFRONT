import { useEffect, useState } from "react";
import PostCard from "../../components/Cards/PostCard/PostCard";
import "./Home.css";
import { getLatestPostService, getTrendingService } from "../../services/post.services";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Loading from "../../components/Layout/Loading/Loading";
import { isLoggedInService } from "../../services/user.services";
import Message from "../../components/Layout/Message/Message";

const Home = () => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showTrendingPosts, setShowTrendingPosts] = useState(true);
  const token = localStorage.getItem("AuthToken");
  const userLocalStorage = JSON.parse(localStorage.getItem("User"));

  async function fetchTrendingPost() {
    try {
      const {posts, likedPostsIds}  = await getTrendingService(token);
      setPostList(posts);
      setLikedPosts(likedPostsIds);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    } 
  }

  async function fetchLatestPost() {
    try {
      const {posts, likedPostsIds} = await getLatestPostService(token);
      setPostList(posts);
      setLikedPosts(likedPostsIds);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } 
  }

  async function handleErrorFetch(err) {
    if(err.code === "ERR_NETWORK") {
      setMessage("Verifique se esta conectado a internet!");
      setIsLoading(false)
      return false;
    }
    else {
      setMessage(err.response.data.message || err.message);
    }

    setTimeout(() => {
      setMessage(null)
    }, 8000);
  }

  useEffect(() => {
    async function verifyIsLogged() {
      try {
        const {user} = await isLoggedInService(token);
        localStorage.setItem("User", JSON.stringify(user));
      } catch (err) {
        // console.log(err);
        if(err.response.status === 401) {
          localStorage.clear();
          return false
        }
        handleErrorFetch(err);
      }
    }
    verifyIsLogged();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if(showTrendingPosts) {
      setPostList([]);
      fetchTrendingPost();
    } else {
      setPostList([]);
      fetchLatestPost();
    }
  }, [showTrendingPosts]);

  return (
    <>
      {message &&
        <Message text={message} type={messageType}/>
      }
      <Navbar
        showTrendingPosts={showTrendingPosts}
        setShowTrendingPosts={(e) => setShowTrendingPosts(e)}
      />
      <section className="homeContainer">
        {userLocalStorage &&
          <CreatePost
            setPostList={(post) => setPostList(prev => [post,...prev])}
            token={token}
            user={userLocalStorage}
          />
        }
        <div className="posts-container">
          {isLoading ? 
            <Loading/> :
            postList.map((item) => (
              <PostCard 
                key={item._id}
                id={item._id}
                user={item.user}
                post={item}
                permissions={item.permissions}
                liked={likedPosts.find((post) => post._id === item._id)}
              />
            ))
          }
        </div>
      </section>
    </>
  );
}

export default Home