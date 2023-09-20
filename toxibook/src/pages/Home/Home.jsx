import { useEffect, useRef, useState } from "react";
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
import Loading from "../../components/Layout/Loading/Loading";
import { AlertBox } from "../../components/AlertBox/AlertBox";
import { BsXCircleFill } from "react-icons/bs";
import Sentinel from "../../components/Sentinel/Sentinel";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({latest}) => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const token = localStorage.getItem("AuthToken");
  const [posts, setPosts] = useState([]);

  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);

  const redirect = useNavigate();
  const location = useLocation();

  async function fetchPosts() {
    try {
      let postsRes; 
      
      if(latest) postsRes = await getLatestPostService(token, currentPage);
      else postsRes = await getTrendingService(token, currentPage);
      
      hasMoreRef.current = postsRes.length === 10 

      setPosts(prev => [...prev, ...postsRes]);
      loadingRef.current = false;
    } catch (error) {
      console.log(error);
      handleErrorFetch(error);
    }
  }

  async function handleErrorFetch(err) {
    if (err.code === "ERR_NETWORK") {
      setMessage("Verifique se esta conectado a internet!");
      loadingRef.current = false;
      return false;
    } else {
      setMessage(err.response.data.message || err.message);
    }

    setTimeout(() => {
      setMessage(null);
    }, 10000);
  }

  function resetPosts() {
    setCurrentPage(0);
    loadingRef.current = true;
    hasMoreRef.current = true;
    setPosts([]);
  }

  useEffect(() => {
    if(currentPage === 0) {
      setCurrentPage(1)
      return
    }
    loadingRef.current = true

    fetchPosts();
  }, [currentPage])

  useEffect(() => {
    resetPosts();
  }, [location])


  function deletePost(id) {
    console.log(id)
    setPosts(prev => prev.filter(post => post._id !== id));
  }

  return (
    <>
      {message && <Message hideMessage={() => setMessage(null)} text={message} type={messageType} />}
      <Navbar
        onOption1={() => redirect("/")}
        onOption2={() => redirect("/latest")}
        firstSelected={!latest}
      />
      <div className="homeContainer">
        <NavSide/>
        <section className="home">
          <CreatePost setPosts={(post) => setPosts(prev => [post, ...prev])} />
          <div className="posts-container">
            {renderPosts(posts,null, null, loadingRef)}

            {!hasMoreRef.current && <AlertBox text={"Não foi possivel carregar mais posts"} icon={<BsXCircleFill/>} theme={""}/>}

            {loadingRef.current && <Loading position="static"/>}

            <Sentinel 
              hasMore={hasMoreRef} 
              loading={loadingRef} 
              incrementPage={() => setCurrentPage(prev => prev+1)} 
            />
          </div> 
        </section>
      </div>
    </>
  );
};

export default Home;
