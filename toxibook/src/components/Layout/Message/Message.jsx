import "./Message.css"; 

const Message = ({text, type = "error", hideMessage}) => {
	return (
		<div className={`messageBarContainer centerFlex ${type}`}>
			<div className="messageBar">
				<p>{text}</p>
				<span onClick={hideMessage}>X</span>
			</div>
		</div>
	)
}

export default Message