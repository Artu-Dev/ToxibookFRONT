import { useEffect, useRef, useState } from "react"

export const PostText = ({text, wordSearch}) => {
	const [showFullText, setShowFullText] = useState(false);
	const maxHeight = 200;

	const textContentRef = useRef();
	
	function toggleShowFullText(e) {	
		e.preventDefault();
		setShowFullText(!showFullText);
	}
	
  function boldTextContent() {
    const regex = new RegExp(wordSearch, "i");
    const newText = textContentRef.current.textContent.replace(regex, match => `<b>${match}</b>`);
    textContentRef.current.innerHTML = newText;
  }

  async function formatText() {
		const sanitizedText = text.replace(/<[^>]*>/g, "");
		const formatedText = sanitizedText.replace(/\n/g, "<br>");
		textContentRef.current.innerHTML = formatedText;
  } 
	
  useEffect(() => {
		formatText()
    if(wordSearch) boldTextContent(); 
		
		if(textContentRef.current.clientHeight < maxHeight) {
			setShowFullText(true);
		}
  }, [])
	

	return (
		<div>
			<p 
				className="textContainer"
				ref={textContentRef}
				style={{
					maxHeight: showFullText ? "none" : `${maxHeight}px`
				}}
			>
				{text}
			</p>
			{!showFullText && 
				<span onClick={toggleShowFullText} className="readMore">Ler Mais</span>
			}
		</div>
	)
}
