import { useCallback, useEffect, useRef, useState } from "react";
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
import Loading from "../../components/Layout/Loading/Loading";
import { AlertBox } from "../../components/AlertBox/AlertBox";
import { BsXCircleFill } from "react-icons/bs";

const Home = () => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const token = localStorage.getItem("AuthToken");
  const {posts, setPost, addPost} = usePostContext();
  const prevPage = useRef(currentPage);
  const sentinelRef = useRef();

  async function fetchTrendingPost() {
    try {
      const postsRes = await getTrendingService(token, currentPage);
      setHasMore(!!postsRes.length)

      addPost(postsRes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handleErrorFetch(error);
    }
  }

  async function fetchLatestPost() {
    try {
      const posts = await getLatestPostService(token);
      setPost(posts);
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
    setIsLoading(true)
    fetchTrendingPost(); 
    prevPage.current = currentPage;
  }, [currentPage])
  

  const sentinelElementRef = useCallback(node => {
    if(isLoading) return;
    if(sentinelRef.current) sentinelRef.current.disconnect();

    sentinelRef.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setCurrentPage(prev => prev+1);
      }
    })

    if(node) sentinelRef.current.observe(node)
  });

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
          <CreatePost />
          <div className="posts-container">
            {renderPosts(posts, null, null, null, sentinelElementRef)}
            {isLoading && <Loading position="static"/>}
            {!hasMore && <AlertBox text={"Não foi possivel carregar mais posts"} icon={<BsXCircleFill/>} theme={""}/>}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
