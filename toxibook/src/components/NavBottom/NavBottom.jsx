import { HiBell, HiHome, HiPlus, HiSearch } from 'react-icons/hi'
import { IoExit } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';

import "./NavBottom.css";
import { useContext } from 'react';
import { AuthUserContext } from '../../contexts/AuthUser';

const NavBottom = () => {
	const navigate = useNavigate();
  const {signed, logOut} = useContext(AuthUserContext);

  function handleLogout() {
    if(!signed) return navigate("/login");
    const userResponse = confirm("Deseja mesmo deslogar de sua conta Toxibook?");
    if(!userResponse) return;
    logOut();
    navigate("/login");
  }

  return (
    <nav className="navBottom-container">
      <ul className="nav-items">
        <li>
          <Link to="/">
            <HiHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/search">
            <HiSearch />
            <span>Search</span>
          </Link>
        </li>
        <li className="nav-createPost">
          <HiPlus/>
        </li>
        <li>
          <Link to="/notifications">
            <HiBell /> 
            <span>Alerts</span>
          </Link>
        </li>
        <li onClick={handleLogout}>
          <a>
            <IoExit/>
            <span>Exit</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavBottom