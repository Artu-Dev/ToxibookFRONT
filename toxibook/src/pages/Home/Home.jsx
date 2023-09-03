import { useEffect, useState } from "react";
import PostCard from "../../components/Cards/PostCard/PostCard";
import "./Home.css";
import {
  getLatestPostService,
  getTrendingService,
} from "../../services/post.services";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Loading from "../../components/Layout/Loading/Loading";
import Message from "../../components/Layout/Message/Message";
import { NavSide } from "../../components/NavSide/NavSide";
import { renderPosts } from "../../functions/globalFunctions";

const Home = () => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const token = localStorage.getItem("AuthToken");

  async function fetchTrendingPost() {
    try {
      const { posts, likedPostsIds } = await getTrendingService(token);
      setPostList(posts);
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
      setPostList(posts);
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

  function renderPostCards() {
    if(isLoading) return  <Loading position={"block"}/> 

    if(postList.length === 0) return <p>Nenhuma postagem encontrado!</p>

    return postList.map((item) => (
      <PostCard
        key={item._id}
        id={item._id}
        postUser={item.user}
        post={item}
        permissions={item.permissions}
        liked={likedPosts.find((post) => post._id === item._id)}
      />
    ));
  }

  function onChangeNavbar(fetchFunc) {
    setIsLoading(true)
    setPostList([]);
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
            setPostList={(post) => setPostList((prev) => [post, ...prev])}
            token={token}
          />
          <div className="posts-container">
            {renderPosts(postList, likedPosts, isLoading)}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
