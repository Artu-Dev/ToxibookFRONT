import "./SearchPage.css";
import {MdArrowBack, MdManageSearch, MdSearch} from "react-icons/md"
import {AlertBox} from "../../components/AlertBox/AlertBox";
import { useEffect, useRef, useState } from "react";
import {getPostBySearchService} from "../../services/post.services";
import { renderPosts } from "../../functions/globalFunctions";
import { useNavigate } from "react-router-dom";
import {NavSide} from "../../components/NavSide/NavSide";

const SearchPage = () => {
	const token = localStorage.getItem("AuthToken");
	const params = new URLSearchParams(window.location.search);
	const searchParam = params.get("t");
	const redirect = useNavigate();

	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);
	const searchInputRef = useRef();

	function changeUrl(e) {
		e.preventDefault();
		const encodedValue = encodeURIComponent(searchInputRef.current.value)
		redirect(`?t=${encodedValue}`)
	}

	useEffect(() => {
		async function fetchSeachPosts() {
			setLoading(true);
			const cleanedSearchParam = searchParam.replace(/^"(.*)"$/, '$1');
			const postsResponse = await getPostBySearchService(cleanedSearchParam, token);
			setLoading(false);
			if(!postsResponse.posts.length) setPosts(null);
			else setPosts(postsResponse);
		}
		
		if(searchParam) {
			setPosts([]);
			fetchSeachPosts();
		}
		searchInputRef.current.value = searchParam;

	},[searchParam])

	return (
    <section className="searchPage-container">
      <NavSide />
      <div className="searchContainer">
        <span className="backButton" onClick={() => redirect("/")}>
          <MdArrowBack />
        </span>
        <form onSubmit={changeUrl} className="searchBar">
          <input placeholder="Pesquisar" ref={searchInputRef} />
          <button type="submit">
            <MdSearch />
          </button>
        </form>
      </div>

      <div className="postsContainer">
        {searchParam ? (
          posts ? (
            renderPosts(posts.posts, posts.likedPostsIds, loading, searchParam)
          ) : (
            <AlertBox text={"Nenhum Post encontrado"} icon={"?"} theme={"alert"} />
          )
        ) : (
          <AlertBox text={"Pesquise por postagens"} icon={<MdManageSearch />} />
        )}
      </div>
    </section>
  );
}

export default SearchPage