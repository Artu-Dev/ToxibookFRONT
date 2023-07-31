import {VscLoading} from "react-icons/vsc"
import "./Loading.css";

const Loading = ({position = "fixed"}) => {
  return (
    <span style={{position: position}} className="loading-container">
      <VscLoading/>
    </span>
  )
}

export default Loading