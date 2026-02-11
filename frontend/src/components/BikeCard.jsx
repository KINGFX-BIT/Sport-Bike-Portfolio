import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { WishlistContext } from '../context/WishlistContext';

const BikeCard = ({ bike }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  
  const primaryImage = bike.images?.find(img => img.isPrimary)?.url || 
                        bike.images?.[0]?.url || 
                        'https://via.placeholder.com/400x300?text=No+Image';

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(bike.id)) {
      removeFromWishlist(bike.id);
    } else {
      addToWishlist(bike);
    }
  };

  return (
    <Card className="bike-card">
      <div className="position-relative">
        <Link to={`/bikes/${bike.id}`}>
          <Card.Img 
            variant="top" 
            src={primaryImage} 
            className="bike-card-img"
            alt={bike.name}
          />
        </Link>
        <div 
          className={`wishlist-icon ${isInWishlist(bike.id) ? 'active' : ''}`}
          onClick={handleWishlist}
        >
          {isInWishlist(bike.id) ? (
            <FaHeart size={20} color="#fff" />
          ) : (
            <FaRegHeart size={20} color="#fff" />
          )}
        </div>
      </div>
      
      <Card.Body className="bike-card-body">
        <div className="bike-card-brand">{bike.brand_name}</div>
        <Link to={`/bikes/${bike.id}`} className="text-decoration-none">
          <Card.Title className="bike-card-title">{bike.name}</Card.Title>
        </Link>
        
        <div className="bike-card-specs">
          <div className="bike-card-spec">
            <div className="bike-card-spec-label">Engine</div>
            <div className="bike-card-spec-value">{bike.engine_cc}cc</div>
          </div>
          <div className="bike-card-spec">
            <div className="bike-card-spec-label">Power</div>
            <div className="bike-card-spec-value">{bike.horsepower}HP</div>
          </div>
          <div className="bike-card-spec">
            <div className="bike-card-spec-label">Top Speed</div>
            <div className="bike-card-spec-value">{bike.top_speed}km/h</div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="bike-card-price">
            ${bike.price?.toLocaleString()}
          </div>
          <span className="badge bg-secondary">{bike.category}</span>
        </div>

        <Link to={`/bikes/${bike.id}`} className="btn btn-primary w-100 mt-3">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BikeCard;
