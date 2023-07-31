import "./Message.css"; 

const Message = ({text, type, hideMessage}) => {
	return (
		<div className={`messageBar centerFlex ${type}`}>
			<p>{text}</p>
			<span onClick={hideMessage}>X</span>
		</div>
	)
}

export default Message