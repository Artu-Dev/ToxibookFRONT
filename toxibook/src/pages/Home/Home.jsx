import { useEffect, useState } from "react";
import "./Home.css";
import {
  getLatestPostService,
  getTrendingService,
} from "../../services/post.services";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Message from "../../components/Layout/Message/Message";
import { NavSide } from "../../components/NavSide/NavSide";
import { renderPosts } from "../../functions/globalFunctions";
import { usePostContext } from "../../contexts/PostContext";

const Home = () => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);

  const token = localStorage.getItem("AuthToken");
  const {posts, setPost} = usePostContext();

  async function fetchTrendingPost() {
    try {
      const { posts, likedPostsIds } = await getTrendingService(token);
      setPost(posts);
      setLikedPosts(likedPostsIds);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handleErrorFetch(error);
    }
  }

  async function fetchLatestPost() {
    try {
      const { posts, likedPostsIds } = await getLatestPostService(token);
      setPost(posts);
      setLikedPosts(likedPostsIds);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handleErrorFetch(error);
    }
  }

  async function handleErrorFetch(err) {
    if (err.code === "ERR_NETWORK") {
      setMessage("Verifique se esta conectado a internet!");
      setIsLoading(false);
      return false;
    } else {
      setMessage(err.response.data.message || err.message);
    }

    setTimeout(() => {
      setMessage(null);
    }, 10000);
  }

  function onChangeNavbar(fetchFunc) {
    setIsLoading(true)
    setPost([]);
    fetchFunc();
  }

  useEffect(() => {
    fetchTrendingPost();
  }, []);

  return (
    <>
      {message && <Message hideMessage={() => setMessage(null)} text={message} type={messageType} />}
      <Navbar
        onOption1={() => onChangeNavbar(fetchTrendingPost)}
        onOption2={() => onChangeNavbar(fetchLatestPost)}
      />
      <div className="homeContainer">
        <NavSide/>
        <section className="home">
          <CreatePost
            setPostList={(post) => setPost((prev) => [post, ...prev])}
            token={token}
          />
          <div className="posts-container">
            {renderPosts(posts, likedPosts, isLoading)}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
