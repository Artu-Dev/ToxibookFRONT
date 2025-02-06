import { useState, useEffect, useCallback, useRef } from 'react';
import { getLatestPostService, getTrendingService } from '../services/post.services';

export const usePostsFetcher = (token, type = 'trending') => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef();

  const fetchPosts = useCallback(async () => {
    if (!token || !hasMore || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    try {
      abortControllerRef.current = new AbortController();
      
      const service = type === 'latest' ? getLatestPostService : getTrendingService;
      const postsRes = await service(
        token, 
        currentPage + 1, // API começa na página 1
        { signal: abortControllerRef.current.signal }
      );

      setPosts(prev => currentPage === 0 ? postsRes : [...prev, ...postsRes]);
      setHasMore(postsRes.length >= 10); // Supondo que 10 é o limite por página
      setCurrentPage(prev => prev + 1);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, type, currentPage, hasMore, isLoading]);

  const resetPosts = useCallback(() => {
    setCurrentPage(0);
    setPosts([]);
    setHasMore(true);
    abortControllerRef.current?.abort();
  }, []);

  const deletePost = useCallback((postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  }, []);

  useEffect(() => {
    if (currentPage === 0 && hasMore) {
      fetchPosts();
    }
  }, [currentPage, fetchPosts, hasMore]);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return {
    posts,
    isLoading,
    hasMore,
    setPosts,
    error,
    fetchPosts,
    deletePost,
    resetPosts,
    currentPage
  };
};
