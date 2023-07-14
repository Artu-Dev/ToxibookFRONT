import { useEffect } from "react";
import "./ImageModal.css";

const ImageModal = ({imageSrc, setShowImageModal}) => {
	
	useEffect(() => {
		const onPressEsc = (event) => {
			if(event.key === "Escape") {
				setShowImageModal();
			}
		}

		window.addEventListener("keyup", onPressEsc)
	
		return () => {
			window.removeEventListener("keyup", onPressEsc);
		}
	}, [])
	

	function handleContainerClick(event) {
		event.stopPropagation();
		setShowImageModal();
	}
	function handeImageClick(event) {
		event.stopPropagation();
	}

	return (
		<div className="imageModal-container" 
			onClick={handleContainerClick}
		>
			<div className="image-container" 
				onClick={handeImageClick}
			>
				<img src={imageSrc}/>
			</div>
		</div>
	)
}

export default ImageModal