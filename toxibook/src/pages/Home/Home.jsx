import { useEffect, useState } from "react";
import PostCard from "../../components/Cards/PostCard/PostCard";
import PostMin from "../../components/Cards/PostMin/PostMin";
import "./Home.css";
import { getTrendingService } from "../../services/post.services";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";

const Home = () => {
  const [postList, setPostList] = useState([]);
  // const [user, setUser] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const token = localStorage.getItem("AuthToken");
  const user = JSON.parse(localStorage.getItem("User"));

  console.log(user);

  useEffect(() => {
    async function fetchPost() {
      try {
        const posts = await getTrendingService(token);
        setPostList(posts.posts);
        setLikedPosts(posts.likedPostsIds);
      } catch (error) {
        console.log(error);
      } 
    }
    async function fetchUser() {
      try {
        const user = await getTrendingService(token);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, [])
  
  // console.log(postList);

  return (
    <>
      <Navbar/>
      <section className="homeContainer">
        <CreatePost
          tag={user?.tag}
          username={user?.username}
          userPFP={user?.profileImg}
          verified={user?.verified}
        />
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