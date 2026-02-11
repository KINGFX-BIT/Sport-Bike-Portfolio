import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="footer-title">🏍️ SPORTBIKE</h5>
            <p className="text-secondary">
              Your ultimate destination for exploring the world's finest sport motorcycles.
              From beginner-friendly bikes to track-focused superbikes.
            </p>
            <div className="mt-3">
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/bikes" className="footer-link">All Bikes</Link>
            <Link to="/brands" className="footer-link">Brands</Link>
            <Link to="/categories" className="footer-link">Categories</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-title">Categories</h5>
            <Link to="/categories?type=SuperSport" className="footer-link">SuperSport</Link>
            <Link to="/categories?type=HyperSport" className="footer-link">HyperSport</Link>
            <Link to="/categories?type=Street Sport" className="footer-link">Street Sport</Link>
            <Link to="/categories?type=Track" className="footer-link">Track</Link>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-title">Top Brands</h5>
            <Link to="/brands?brand=Yamaha" className="footer-link">Yamaha</Link>
            <Link to="/brands?brand=Kawasaki" className="footer-link">Kawasaki</Link>
            <Link to="/brands?brand=Ducati" className="footer-link">Ducati</Link>
            <Link to="/brands?brand=BMW" className="footer-link">BMW</Link>
            <Link to="/brands?brand=Honda" className="footer-link">Honda</Link>
          </Col>
        </Row>

        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col className="text-center">
            <p className="text-secondary mb-2">
              &copy; {new Date().getFullYear()} Sport Bike Portfolio. All rights reserved.
              <span className="mx-3">|</span>
              <Link to="/privacy" className="text-secondary text-decoration-none">Privacy Policy</Link>
              <span className="mx-3">|</span>
              <Link to="/terms" className="text-secondary text-decoration-none">Terms of Service</Link>
            </p>
            <p className="text-secondary mb-0" style={{fontSize: '0.9rem'}}>
              Design and Development by <strong>UNMESH PAWAR</strong> - Full Stack Web Developer
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
