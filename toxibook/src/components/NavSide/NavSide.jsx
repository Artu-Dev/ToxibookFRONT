import { HiBell, HiHome, HiSearch } from 'react-icons/hi';
import { IoExit, IoPerson } from 'react-icons/io5';
import "./NavSide.css";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthUserContext } from '../../contexts/AuthUser';

export const NavSide = () => {
	const redirect = useNavigate()
  const user = JSON.parse(localStorage.getItem("User"));
	const {signed, logOut} = useContext(AuthUserContext);
  

	function handleRedirectProfile() {
		if(user?._id) {
			redirect(`/profile/${user._id}`);
		} else {
			redirect("/login");
		}
	}

  function handleLogout() {
    if(!signed) return navigate("/login");
    const userResponse = confirm("Deseja mesmo deslogar de sua conta Toxibook?");
    if(!userResponse) return;
    logOut();
    redirect("/login");
  }

	return (
		<section className="navSide-container">
			<ul>
				<li onClick={() => redirect("/")}>Home <span><HiHome/></span></li>
				<li onClick={() => redirect("/search")}>Search <span><HiSearch/></span></li>
				<li onClick={handleRedirectProfile}>Profile <span><IoPerson/></span></li>
				<li>Alerts <span><HiBell/></span></li>
				<li onClick={handleLogout} className="exit-btn">Exit <span><IoExit/></span></li>
			</ul>
		</section>
	)
}
