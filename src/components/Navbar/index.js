import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import "rsuite/dist/rsuite.min.css";
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom"
export default function NavbarComponent() {
  const navigate = useNavigate();
  const handleLogout=()=>{
    fetch(BACKEND_URL + '/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true
      },
     

    })

      .then(async (response) => {
        const data = await response.json();
        if (data.success && data.data && data.data.status === 'SUCCESS') {
            console.log("suc")
          navigate("/");


        } else {
          navigate("/");

        }
      })
      .catch((error) => {
        navigate("/");

      });

  }
    return (
  <Navbar>
    <Navbar.Brand> <img src={Logo} alt="My Image" style={{ width: "130%", height: "130%"}} /></Navbar.Brand>
    <Nav>
    <Nav.Item icon={<HomeIcon />}><Link to="/home">Home</Link></Nav.Item>

      <Nav.Item><Link to="/portfolio">Portfolio</Link></Nav.Item>
      
   
    </Nav>
    <Nav pullRight>
    <Nav.Menu title="My Account">
        <Nav.Item onClick={handleLogout}>Log Out</Nav.Item>
        
        
      </Nav.Menu>
    </Nav>
  </Navbar>
    );
};
