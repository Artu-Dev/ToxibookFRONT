import "./NavBar.css";

const Navbar = ({
  radio1 = "Trending",
  radio2 = "Latest",
  position,
  background,
  onOption1,
  onOption2,
  firstSelected
}) => {

  function handleChange(onOptionFunc) {
    onOptionFunc();
  }

  return (
    <nav
      className="navBar-container"
      style={{ position: position, backgroundColor: background }}
    >
      <input
        onChange={() => handleChange(onOption1)}
        type="radio"
        id="radio-1"
        name="tabs"
        checked={firstSelected}
      />
      <label className="tab" htmlFor="radio-1">
        {radio1}
      </label>
      <input
        onChange={() => handleChange(onOption2)}
        type="radio"
        id="radio-2"
        name="tabs"
        checked={!firstSelected}
      />
      <label className="tab" htmlFor="radio-2">
        {radio2}
      </label>
      <span className="glider"></span>
    </nav>
  );
};

export default Navbar;
