import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const FilterPanel = ({ filters, setFilters, brands, onSearch, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const categories = ['SuperSport', 'HyperSport', 'Street Sport', 'Track'];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'cc_asc', label: 'Engine: Low to High' },
    { value: 'cc_desc', label: 'Engine: High to Low' },
    { value: 'speed_desc', label: 'Top Speed' },
    { value: 'name_asc', label: 'Name: A-Z' }
  ];

  return (
    <div className="filter-section">
      <h4 className="filter-title">🔍 Filter & Search</h4>
      <Form>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search by name..."
                value={filters.search}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Select
                name="brand_id"
                value={filters.brand_id}
                onChange={handleChange}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category}
                onChange={handleChange}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Min Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="min_price"
                placeholder="0"
                value={filters.min_price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Max Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="max_price"
                placeholder="100000"
                value={filters.max_price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Min Engine CC</Form.Label>
              <Form.Control
                type="number"
                name="min_cc"
                placeholder="0"
                value={filters.min_cc}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Max Engine CC</Form.Label>
              <Form.Control
                type="number"
                name="max_cc"
                placeholder="2500"
                value={filters.max_cc}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                name="sort"
                value={filters.sort}
                onChange={handleChange}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Button variant="primary" className="w-100" onClick={onSearch}>
              Apply Filters
            </Button>
          </Col>
          <Col md={6}>
            <Button variant="secondary" className="w-100" onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterPanel;
