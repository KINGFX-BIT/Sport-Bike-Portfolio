import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Carousel, Badge, Table, Button } from 'react-bootstrap';
import { FaArrowLeft, FaHeart, FaRegHeart, FaTachometerAlt, FaGasPump } from 'react-icons/fa';
import { bikeService } from '../services/api';
import BikeCard from '../components/BikeCard';
import { WishlistContext } from '../context/WishlistContext';
import { toast } from 'react-toastify';

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [relatedBikes, setRelatedBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = React.useContext(WishlistContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bikeRes, relatedRes] = await Promise.all([
          bikeService.getById(id),
          bikeService.getRelated(id)
        ]);
        
        setBike(bikeRes.data.data);
        setRelatedBikes(relatedRes.data.data);
      } catch (error) {
        toast.error('Failed to load bike details');
        navigate('/bikes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!bike) return null;

  const handleWishlist = () => {
    if (isInWishlist(bike.id)) {
      removeFromWishlist(bike.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(bike);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="bike-details-page">
      <Container className="py-5">
        <Button 
          variant="outline-secondary" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </Button>

        <Row>
          <Col lg={6} className="mb-4">
            <Carousel interval={null} className="bike-carousel">
              {bike.images?.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.url}
                    alt={`${bike.name} - ${index + 1}`}
                    style={{ borderRadius: '15px', height: '500px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col lg={6}>
            <Badge bg="secondary" className="mb-2">{bike.category}</Badge>
            <h6 className="text-uppercase" style={{ color: 'var(--primary-color)' }}>
              {bike.brand_name}
            </h6>
            <h1 className="display-4 mb-3">{bike.name}</h1>
            <h2 className="mb-4" style={{ color: 'var(--primary-color)', fontFamily: 'Orbitron' }}>
              ${bike.price?.toLocaleString()}
            </h2>

            <p className="lead text-secondary mb-4">{bike.description}</p>

            <div className="d-flex gap-3 mb-4">
              <Button 
                variant={isInWishlist(bike.id) ? "danger" : "outline-danger"}
                size="lg"
                onClick={handleWishlist}
              >
                {isInWishlist(bike.id) ? <FaHeart /> : <FaRegHeart />}
                <span className="ms-2">
                  {isInWishlist(bike.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </span>
              </Button>
            </div>

            <h4 className="mt-4 mb-3">Available Colors</h4>
            <div className="d-flex gap-2 mb-4">
              {bike.colors?.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: color.hex,
                    border: '3px solid var(--border-color)',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={12}>
            <h3 className="mb-4">Technical Specifications</h3>
            <Table bordered hover variant="dark" responsive>
              <tbody>
                <tr>
                  <td><strong>Brand</strong></td>
                  <td>{bike.brand_name}</td>
                  <td><strong>Model Year</strong></td>
                  <td>{bike.model_year}</td>
                </tr>
                <tr>
                  <td><strong>Engine Capacity</strong></td>
                  <td>{bike.engine_cc} cc</td>
                  <td><strong>Horsepower</strong></td>
                  <td>{bike.horsepower} HP</td>
                </tr>
                <tr>
                  <td><strong>Torque</strong></td>
                  <td>{bike.torque} Nm</td>
                  <td><strong>Top Speed</strong></td>
                  <td>{bike.top_speed} km/h</td>
                </tr>
                <tr>
                  <td><strong>Mileage</strong></td>
                  <td>{bike.mileage} km/l</td>
                  <td><strong>Category</strong></td>
                  <td>{bike.category}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {relatedBikes.length > 0 && (
          <Row className="mt-5">
            <Col lg={12}>
              <h3 className="mb-4">Related Bikes</h3>
              <Row>
                {relatedBikes.map((bike) => (
                  <Col key={bike.id} lg={3} md={6} className="mb-4">
                    <BikeCard bike={bike} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default BikeDetails;
