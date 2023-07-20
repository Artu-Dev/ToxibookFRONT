import "./Message.css"; 

const Message = ({text, type}) => {
	return (
		<div className={`messageBar centerFlex ${type}`}><p>{text}</p></div>
	)
}

export default Message