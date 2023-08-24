import "./AlertBox.css";

export const AlertBox = ({icon, text, theme}) => {
	return (
		<div className={`alertBox-container ${theme}`}>
			<div className="alertBox-icon">{icon}</div>
			<div className="alertBox-content">
				<h1>{text}</h1>
			</div>
		</div>
	)
}
