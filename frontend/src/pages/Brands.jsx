import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { brandService } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandService.getAll();
        setBrands(response.data.data);
      } catch (error) {
        toast.error('Failed to load brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
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
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-3 mb-3">Motorcycle Brands</h1>
        <p className="lead text-secondary">
          Explore bikes from world's top manufacturers
        </p>
      </div>

      <Row>
        {brands.map((brand) => (
          <Col key={brand.id} lg={3} md={4} sm={6} className="mb-4">
            <Link to={`/bikes?brand_id=${brand.id}`} className="text-decoration-none">
              <Card className="brand-card-large h-100 text-center p-4">
                <Card.Body>
                  <h3 className="mb-3">{brand.name}</h3>
                  <div className="h1 mb-3">🏍️</div>
                  <Badge bg="primary">{brand.bike_count} Bikes</Badge>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Brands;
