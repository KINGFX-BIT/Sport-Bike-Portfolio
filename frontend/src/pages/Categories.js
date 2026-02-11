import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'SuperSport',
      icon: '🏁',
      description: 'High-performance motorcycles designed for speed and track days. These bikes offer the perfect balance of power and handling.',
      features: ['600-1000cc', '100-200 HP', 'Racing ergonomics', 'Advanced electronics'],
      color: 'danger',
      image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800'
    },
    {
      name: 'HyperSport',
      icon: '🚀',
      description: 'Ultimate performance superbikes with cutting-edge technology. The pinnacle of motorcycle engineering and speed.',
      features: ['Above 200 HP', 'Top speed 300+ km/h', 'Carbon fiber', 'MotoGP tech'],
      color: 'warning',
      image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    },
    {
      name: 'Street Sport',
      icon: '🏙️',
      description: 'Versatile bikes perfect for daily commuting and spirited weekend rides. Comfortable yet sporty riding position.',
      features: ['Naked bikes', 'Upright ergonomics', 'Easy handling', 'All-around performance'],
      color: 'info',
      image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    },
    {
      name: 'Track',
      icon: '🏆',
      description: 'Race-spec motorcycles built for the circuit. These bikes are optimized for maximum performance on the track.',
      features: ['Race-ready', 'Lightweight', 'Quick-shifters', 'Race electronics package'],
      color: 'success',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'
    }
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-3 mb-3">Bike Categories</h1>
        <p className="lead text-secondary">
          Find the perfect type of sport bike for your riding style
        </p>
      </div>

      <Row>
        {categories.map((category, index) => (
          <Col key={index} lg={6} className="mb-4">
            <Card className="category-card-large h-100">
              <div 
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '250px',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  fontSize: '4rem'
                }}>
                  {category.icon}
                </div>
              </div>
              
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>{category.name}</h3>
                  <Badge bg={category.color}>Explore</Badge>
                </div>
                
                <p className="text-secondary mb-4">{category.description}</p>
                
                <h6 className="mb-3">Key Features:</h6>
                <ul className="list-unstyled">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="mb-2">
                      <Badge bg="secondary" className="me-2">✓</Badge>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/bikes?category=${category.name}`} 
                  className="btn btn-primary w-100 mt-3"
                >
                  View {category.name} Bikes
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
