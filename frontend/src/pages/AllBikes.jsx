import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { bikeService, brandService } from '../services/api';
import BikeCard from '../components/BikeCard';
import FilterPanel from '../components/FilterPanel';
import { toast } from 'react-toastify';

const AllBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, pages: 0, limit: 12, offset: 0 });
  const [filters, setFilters] = useState({
    search: '',
    brand_id: '',
    category: '',
    min_price: '',
    max_price: '',
    min_cc: '',
    max_cc: '',
    sort: 'newest',
    limit: 12,
    offset: 0
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchBikes();
  }, [filters.offset]);

  const fetchBrands = async () => {
    try {
      const response = await brandService.getAll();
      setBrands(response.data.data);
    } catch (error) {
      toast.error('Failed to load brands');
    }
  };

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] !== '' && filters[key] !== null) {
          params[key] = filters[key];
        }
      });

      const response = await bikeService.getAll(params);
      setBikes(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to load bikes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, offset: 0 }));
    fetchBikes();
  };

  const handleReset = () => {
    setFilters({
      search: '',
      brand_id: '',
      category: '',
      min_price: '',
      max_price: '',
      min_cc: '',
      max_cc: '',
      sort: 'newest',
      limit: 12,
      offset: 0
    });
    fetchBikes();
  };

  const handlePageChange = (page) => {
    const newOffset = (page - 1) * filters.limit;
    setFilters(prev => ({ ...prev, offset: newOffset }));
    window.scrollTo(0, 0);
  };

  const currentPage = Math.floor(filters.offset / filters.limit) + 1;
  const pages = Array.from({ length: pagination.pages }, (_, i) => i + 1);

  return (
    <Container className="py-5">
      <Row>
        <Col lg={3} className="mb-4">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </Col>

        <Col lg={9}>
          <div className="mb-4">
            <h2 className="display-5 mb-2">All Sport Bikes</h2>
            <p className="text-secondary">
              Showing {bikes.length} of {pagination.total} bikes
            </p>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : bikes.length === 0 ? (
            <div className="text-center py-5">
              <h3>No bikes found</h3>
              <p className="text-secondary">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <Row>
                {bikes.map((bike) => (
                  <Col key={bike.id} lg={4} md={6} className="mb-4">
                    <BikeCard bike={bike} />
                  </Col>
                ))}
              </Row>

              {pagination.pages > 1 && (
                <Pagination className="justify-content-center mt-5">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                  
                  {pages.map((page) => (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Pagination.Item>
                  ))}
                  
                  <Pagination.Next
                    disabled={currentPage === pagination.pages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </Pagination>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllBikes;
