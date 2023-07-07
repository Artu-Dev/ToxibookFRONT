
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
        <div className="tabs">
          <input type="radio" id="radio-1" name="tabs" defaultChecked={true}/>
          <label className="tab" htmlFor="radio-1">Trending</label>
          <input type="radio" id="radio-2" name="tabs"/>
          <label className="tab" htmlFor="radio-2">Latest</label>
          <span className="glider"></span>
        </div>
    </nav>
  )
}

export default Navbar