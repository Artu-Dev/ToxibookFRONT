import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";

const Navbar = ({
  radio1 = "Trending",
  radio2 = "Latest",
  position,
  background,
  onOption1,
  onOption2
}) => {
  const [showTrendingPosts, setShowTrendingPosts] = useState(true);

  function handleOpt1(onOptionFunc) {
    setShowTrendingPosts(!showTrendingPosts);
    onOptionFunc();
  }

  return (
    <nav
      className="navBar-container"
      style={{ position: position, backgroundColor: background }}
    >
      <input
        onChange={() => handleOpt1(onOption1)}
        type="radio"
        id="radio-1"
        name="tabs"
        checked={showTrendingPosts}
      />
      <label className="tab" htmlFor="radio-1">
        {radio1}
      </label>
      <input
        onChange={() => handleOpt1(onOption2)}
        type="radio"
        id="radio-2"
        name="tabs"
        checked={!showTrendingPosts}
      />
      <label className="tab" htmlFor="radio-2">
        {radio2}
      </label>
      <span className="glider"></span>
    </nav>
  );
};

export default Navbar;
