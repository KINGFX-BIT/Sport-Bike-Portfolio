import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaHeart, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';

const Navigation = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" variant="dark" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🏍️ SPORTBIKE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/bikes">All Bikes</Nav.Link>
            <Nav.Link as={Link} to="/brands">Brands</Nav.Link>
            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            
            <Nav.Link as={Link} to="/wishlist" className="position-relative">
              <FaHeart size={20} />
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </Nav.Link>

            {user ? (
              <NavDropdown 
                title={<><FaUser /> {user.username}</>} 
                id="user-dropdown"
                align="end"
              >
                {isAdmin() && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <FaCog /> Admin Panel
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <button className="btn btn-primary btn-sm">Register</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
