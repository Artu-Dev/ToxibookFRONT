import { HiBell, HiHome, HiPlus, HiSearch } from 'react-icons/hi'
import { IoEnter, IoExit } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';

import "./NavBottom.css";
import { useUserContext } from '../../contexts/AuthUser';

export const NavBottom = () => {
	const redirect = useNavigate();
  const {signed, logOut} = useUserContext();

  function handleLogout() {
    if(!signed) return redirect("/login");
    const userResponse = confirm("Deseja mesmo deslogar de sua conta Toxibook?");
    if(!userResponse) return;
    logOut();
    redirect("/login");
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
        {signed ? 
          <li onClick={handleLogout}>
            <a>
              <IoExit/>
              <span>Exit</span>
            </a>
          </li>
          : 
          <li>
            <Link to="/login">
              <IoEnter/>
              <span>Entrar</span>
            </Link>
          </li>
        }
      </ul>
    </nav>
  )
}