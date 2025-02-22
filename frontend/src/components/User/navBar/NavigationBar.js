
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FaUserCircle,FaCog } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import "./NavigationBar.css";
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {
    const handleLogout = () => {
        // Logic for logout (e.g., clearing tokens, redirecting to login page)
        navigate("/login")
        alert('Logged out successfully!');
    };

    const navigate = useNavigate();

    const selectionRoute = (route) => {
        if (route) {
            navigate(route);
        }
    };

    return (
        
        <Navbar variant="dark" expand="lg" className='farmerSideNavBar'>
              <div className="UserNav_container">
                <Navbar.Brand href="/userdash/productPage" className='Unavbar-brand'>Sadguru Digitalization</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className='navbar-collapse-container'>
                  <Nav className="ms-auto">
                    <NavDropdown title={<FaUserCircle className='profile-icon w-2 h-1'  />} id="profile-dropdown" align="end">
                      <NavDropdown.Item href="/userdash/myProfile">
                      <FaUserCircle className="me-2" />  My Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/userdash/settings">
                      <FaCog className="me-2" /> Settings
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <Button className="w-100" onClick={handleLogout}>
                      <BiLogOut className="me-2" /> Logout
                      </Button>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Navbar>
        
    );
};

export default NavigationBar;


