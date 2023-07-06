import "./Button.css"

export const Button = ({text, type, loading, icon}) => {
	return (
		<button className={`submit-btn ${type}`}>
		{text}
		<span>
			{icon}
		</span>
	</button>
	)
}
