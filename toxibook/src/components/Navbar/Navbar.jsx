
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = ({radio1 = "Trending", radio2 = "Latest", position, background}) => {
  return (
    <nav className="navBar-container" style={{position: position, backgroundColor: background}}>
      <input type="radio" id="radio-1" name="tabs" defaultChecked={true}/>
      <label className="tab" htmlFor="radio-1">{radio1}</label>
      <input type="radio" id="radio-2" name="tabs"/>
      <label className="tab" htmlFor="radio-2">{radio2}</label>
      <span className="glider"></span>
    </nav>
  )
}

export default Navbar