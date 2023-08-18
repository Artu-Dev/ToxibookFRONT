import { VscLoading } from "react-icons/vsc"
import "./Button.css"

export const Button = ({text, type, loading, icon, onClickBtn}) => {
	return (
		<button 
			className={`submit-btn ${type ? type : ""}`}
			onClick={onClickBtn}
			disabled={loading}
		>
		{text}
		<span className={`${loading ? "loading" : ""}`}>
			{!loading ? icon : <VscLoading />}
		</span>
	</button>
	)
}
