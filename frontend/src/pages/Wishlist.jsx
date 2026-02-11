import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="display-4 mb-3">Your Wishlist is Empty</h2>
          <p className="lead text-secondary mb-4">
            Start adding bikes to your wishlist to keep track of your favorites!
          </p>
          <Link to="/bikes" className="btn btn-primary btn-lg">
            Browse Bikes
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-4 mb-2">My Wishlist</h1>
          <p className="text-secondary">{wishlist.length} bikes saved</p>
        </div>
        <Button variant="outline-danger" onClick={clearWishlist}>
          <FaTrash className="me-2" />
          Clear All
        </Button>
      </div>

      <Row>
        {wishlist.map((bike) => (
          <Col key={bike.id} lg={4} md={6} className="mb-4">
            <Card className="bike-card h-100">
              <Link to={`/bikes/${bike.id}`}>
                <Card.Img 
                  variant="top" 
                  src={bike.images?.[0]?.url || 'https://via.placeholder.com/400x300'}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              </Link>
              
              <Card.Body>
                <div className="bike-card-brand">{bike.brand_name}</div>
                <Card.Title className="bike-card-title">{bike.name}</Card.Title>
                
                <div className="bike-card-specs mb-3">
                  <div className="bike-card-spec">
                    <div className="bike-card-spec-label">Engine</div>
                    <div className="bike-card-spec-value">{bike.engine_cc}cc</div>
                  </div>
                  <div className="bike-card-spec">
                    <div className="bike-card-spec-label">Power</div>
                    <div className="bike-card-spec-value">{bike.horsepower}HP</div>
                  </div>
                </div>

                <div className="bike-card-price mb-3">
                  ${bike.price?.toLocaleString()}
                </div>

                <div className="d-grid gap-2">
                  <Link to={`/bikes/${bike.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => removeFromWishlist(bike.id)}
                  >
                    <FaTrash className="me-2" />
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
