import "./SearchPage.css";
import {MdArrowBack, MdManageSearch, MdSearch} from "react-icons/md"
import {AlertBox} from "../../components/AlertBox/AlertBox";
import { useEffect, useRef, useState } from "react";
import {getPostBySearchService} from "../../services/post.services";
import { renderPosts } from "../../functions/globalFunctions";
import { useNavigate } from "react-router-dom";
import {NavSide} from "../../components/NavSide/NavSide";
import Sentinel from "../../components/Sentinel/Sentinel";

const SearchPage = () => {
	const token = localStorage.getItem("AuthToken");
	const params = new URLSearchParams(window.location.search);
	const searchParam = params.get("t");
	const redirect = useNavigate();

	const [posts, setPosts] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	
	const searchInputRef = useRef();
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(true);

	function changeUrl(e) {
		e.preventDefault();
		const encodedValue = encodeURIComponent(searchInputRef.current.value)
		redirect(`?t=${encodedValue}`)
	}

	async function fetchSeachPosts() {
		loadingRef.current = true
		const cleanedSearchParam = searchParam.replace(/^"(.*)"$/, '$1');
		const postsResponse = await getPostBySearchService(cleanedSearchParam, token, currentPage);
		
		hasMoreRef.current = postsResponse.length === 10;
		loadingRef.current = false

		if(!postsResponse.length) setPosts(null);
		else setPosts(prev => [...prev, ...postsResponse]);
	}

	useEffect(() => {
		setCurrentPage(1);

		if(searchParam) {
			setPosts([]);
			fetchSeachPosts();
		}
		searchInputRef.current.value = searchParam;

	},[searchParam])

	useEffect(() => {
		if(currentPage === 1) return;
		loadingRef.current = true
		fetchSeachPosts();
	}, [currentPage])

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
            renderPosts(posts, searchParam, false)
          ) : (
            <AlertBox text={"Nenhum Post encontrado"} icon={"?"} theme={"alert"} />
          )
        ) : (
          <AlertBox text={"Pesquise por postagens"} icon={<MdManageSearch />} />
        )}

				<Sentinel 
					hasMore={hasMoreRef}
					loading={loadingRef}
					incrementPage={() => setCurrentPage(prev => prev+1)}
				/>
      </div>
    </section>
  );
}

export default SearchPage