
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-postTypes">
        <Link to={"#"} className="trending selected">Trending</Link>
        <Link to={"#"} className="latest">Latest</Link>
      </div>

      <div className="navbar-profile">
        <img className="profile-picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6UiaZQxZ2DIDpK3L5autlrvi6y1Eg_5c9Gj9QCYq9w&s" alt="" />
      </div>
    </nav>
  )
}

export default Navbar