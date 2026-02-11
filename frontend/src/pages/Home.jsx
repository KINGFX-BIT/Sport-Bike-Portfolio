import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { bikeService, brandService } from '../services/api';
import BikeCard from '../components/BikeCard';
import { FaBolt, FaTachometerAlt, FaFire } from 'react-icons/fa';

const Home = () => {
  const [featuredBikes, setFeaturedBikes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bikesRes, brandsRes] = await Promise.all([
          bikeService.getFeatured(),
          brandService.getAll()
        ]);
        
        setFeaturedBikes(bikesRes.data.data);
        setBrands(brandsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="hero-content fade-in">
            <h1 className="hero-title">SPORT BIKES</h1>
            <p className="hero-subtitle">
              Explore 100+ Premium Sport Motorcycles from World's Top Brands
            </p>
            <div className="mt-4">
              <Link to="/bikes" className="btn btn-primary btn-lg me-3">
                <FaBolt className="me-2" />
                Browse All Bikes
              </Link>
              <Link to="/categories" className="btn btn-secondary btn-lg">
                <FaTachometerAlt className="me-2" />
                View Categories
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-dark">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="stat-box fade-in">
                <FaFire size={50} className="text-danger mb-3" />
                <h2 className="display-4">100+</h2>
                <p className="text-secondary">Sport Bikes</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="stat-box fade-in">
                <FaBolt size={50} className="text-warning mb-3" />
                <h2 className="display-4">11</h2>
                <p className="text-secondary">Premium Brands</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="stat-box fade-in">
                <FaTachometerAlt size={50} className="text-info mb-3" />
                <h2 className="display-4">400+</h2>
                <p className="text-secondary">km/h Top Speed</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Bikes */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 mb-3">
              <FaFire className="text-danger me-3" />
              Featured Bikes
            </h2>
            <p className="text-secondary lead">
              Check out the most powerful and fastest sport bikes
            </p>
          </div>

          <Row>
            {featuredBikes.map((bike) => (
              <Col key={bike.id} lg={4} md={6} className="mb-4">
                <BikeCard bike={bike} />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Link to="/bikes" className="btn btn-primary btn-lg">
              View All Bikes
            </Link>
          </div>
        </Container>
      </section>

      {/* Brands Section */}
      <section className="py-5 bg-dark">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 mb-3">Top Brands</h2>
            <p className="text-secondary lead">
              Explore motorcycles from world-renowned manufacturers
            </p>
          </div>

          <Row className="justify-content-center">
            {brands.slice(0, 8).map((brand) => (
              <Col key={brand.id} lg={3} md={4} sm={6} className="mb-4">
                <Link to={`/brands?brand=${brand.id}`} className="text-decoration-none">
                  <div className="brand-card text-center p-4">
                    <div className="brand-name h5 mb-0">{brand.name}</div>
                    <small className="text-secondary">{brand.bike_count} Bikes</small>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Link to="/brands" className="btn btn-secondary btn-lg">
              View All Brands
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 mb-3">Categories</h2>
            <p className="text-secondary lead">
              Find the perfect bike type for your riding style
            </p>
          </div>

          <Row>
            {[
              { name: 'SuperSport', desc: 'High-performance track-ready machines', icon: '🏁' },
              { name: 'HyperSport', desc: 'Ultimate performance superbikes', icon: '🚀' },
              { name: 'Street Sport', desc: 'Perfect for daily riding and fun', icon: '🏙️' },
              { name: 'Track', desc: 'Race-spec bikes for the circuit', icon: '🏆' }
            ].map((category) => (
              <Col key={category.name} lg={3} md={6} className="mb-4">
                <Link to={`/categories?type=${category.name}`} className="text-decoration-none">
                  <div className="category-card text-center p-4">
                    <div className="category-icon mb-3" style={{ fontSize: '3rem' }}>
                      {category.icon}
                    </div>
                    <h4 className="mb-2">{category.name}</h4>
                    <p className="text-secondary mb-0">{category.desc}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient">
        <Container className="text-center">
          <h2 className="display-4 mb-3">Ready to Find Your Dream Bike?</h2>
          <p className="lead text-secondary mb-4">
            Browse our extensive collection and discover the perfect sport bike
          </p>
          <Link to="/bikes" className="btn btn-primary btn-lg">
            Start Exploring Now
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default Home;
