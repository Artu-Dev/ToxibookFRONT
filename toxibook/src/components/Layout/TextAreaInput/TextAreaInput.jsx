import React, { useRef, useState } from 'react';
import "./TextAreaInput.css";

const TextAreaInput = ({placeholder, value, icon, legend, setTextContent}) => {
	const textAreaRef = useRef();

	function autoGrow() {
    setTextContent(textAreaRef.current.value)
		textAreaRef.current.style.height = "5px";
		textAreaRef.current.style.height = (textAreaRef.current.scrollHeight) + "px";
	}
	
	return (
		<span className="textarea-container">
			<p>{legend}</p>
			<textarea
				defaultValue={value}
				placeholder={placeholder}
				onInput={autoGrow}
				ref={textAreaRef}
			/>
			<i className="textarea-icon">{icon}</i>
		</span>
	)
}

export default TextAreaInput