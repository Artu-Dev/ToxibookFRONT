import { HiBell, HiCog, HiHome, HiPlus, HiSearch } from 'react-icons/hi'

import "./NavBottom.css";
import { Link } from 'react-router-dom';

const NavBottom = () => {
  return (
    <nav className="navBottom-container">
      <ul className="nav-items">
        <li>
          <HiHome />
          <Link to="/">Home</Link>
        </li>
        <li>
          <HiSearch />
          <Link to="/">Search</Link>
        </li>
        <li className="nav-createPost">
          <HiPlus/>
        </li>
        <li>
          <HiBell /> 
          <Link to="/">Alerts</Link>
        </li>
        <li>
          <HiCog />
          <Link to="/">Settings</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBottom