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
import { usePostsFetcher } from "../../functions/usePostsFetcher";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Home = ({ latest }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const postsContainerRef = useRef();
  const observerRef = useRef();

  const { 
    posts, 
    isLoading, 
    hasMore, 
    error,
    deletePost,
    resetPosts
  } = usePostsFetcher(token, latest ? 'latest' : 'trending');

  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    if (!authToken) navigate("/login");
    setToken(authToken);
  }, []);

  useEffect(() => {
    if (!postsContainerRef.current) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        resetPosts();
      }
    }, { threshold: 1.0 });

    observerRef.current.observe(postsContainerRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoading]);

  const memoizedPosts = useMemo(() => posts, [posts]);
  
return (
    <>
      <Navbar
        onOption1={() => navigate("/")}
        onOption2={() => navigate("/latest")}
        firstSelected={!latest}
      />
      <div className="homeContainer">
        <NavSide/>
        <section className="home">
          <CreatePost setPosts={setPosts} />
          <div className="posts-container" ref={postsContainerRef}>
            {renderPosts(memoizedPosts)}
            
            {error && (
              <Message 
                text={error} 
                type="error" 
                onDismiss={() => resetPosts()} 
              />
            )}

            {!hasMore && (
              <AlertBox text="Não há mais posts para carregar" />
            )}

            {isLoading && <Loading />}
          </div> 
        </section>
      </div>
    </>
  );
};

Home.propTypes = {
  latest: PropTypes.bool
};

export default Home;
