import React, { useEffect, useRef } from 'react'
import "./Sentinel.css"

const Sentinel = ({hasMore, loading, incrementPage}) => {
  const sentinelRef = useRef();
	useEffect(() => {
    const lastPostOberserver = new IntersectionObserver(([entry]) => {
			if(entry.isIntersecting && hasMore.current && !loading.current) {
        incrementPage()
      }
    })

    if(sentinelRef.current) {
      lastPostOberserver.observe(sentinelRef.current)
    }

    return () => {
      lastPostOberserver.disconnect();
    }
  }, [sentinelRef]) 

	return (
		<div id='sentinel' ref={sentinelRef}></div>
		)
}

export default Sentinel