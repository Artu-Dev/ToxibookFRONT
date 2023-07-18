import { useEffect, useState } from "react";
import PostCard from "../../components/Cards/PostCard/PostCard";
import "./Home.css";
import { getTrendingService } from "../../services/post.services";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Loading from "../../components/Layout/Loading/Loading";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const token = localStorage.getItem("AuthToken");
  const userLocalStorage = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    async function fetchPost() {
      try {
        const posts = await getTrendingService(token);
        console.log(posts);
        setPostList(posts.posts);
        setLikedPosts(posts.likedPostsIds);
      } catch (error) {
        console.log(error);
      } 
    }
    async function fetchUser() {
      try {
        alert("ihgu")
        // const user = await getTrendingService(token);
        // setUser(user);
      } catch (error) {
        console.log(error);
      }
    }

    setUser(userLocalStorage);
    if(!userLocalStorage) fetchUser();
    fetchPost();
  }, [])
  
  // console.log(postList);

  if(postList.length === 0) return <Loading/>
  return (
    <>
      <Navbar/>
      <section className="homeContainer">
        {user &&
          <CreatePost
            setPostList={(post) => setPostList(prev => [post,...prev])}
            token={token}
            tag={user?.tag}
            username={user?.username}
            userPFP={user?.profileImg}
            verified={user?.verified}
            id={user?._id}
          />
        }
        <div className="posts-container">
          {postList &&
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