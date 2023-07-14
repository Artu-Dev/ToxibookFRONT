import "./Button.css"

export const Button = ({text, type, loading, icon, onClickBtn}) => {
	return (
		<button className={`submit-btn ${type}`} onClick={onClickBtn}>
		{text}
		<span>
			{icon}
		</span>
	</button>
	)
}
