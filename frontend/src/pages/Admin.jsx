import React from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaMotorcycle, FaTags, FaChartBar } from 'react-icons/fa';

// Simple admin components - in a real app these would be separate files
const AdminDashboard = () => (
  <div>
    <h2 className="mb-4">Dashboard</h2>
    <Row>
      <Col md={4} className="mb-4">
        <Card className="text-center p-4">
          <FaMotorcycle size={50} className="text-primary mb-3" />
          <h3>100+</h3>
          <p className="text-secondary">Total Bikes</p>
        </Card>
      </Col>
      <Col md={4} className="mb-4">
        <Card className="text-center p-4">
          <FaTags size={50} className="text-success mb-3" />
          <h3>11</h3>
          <p className="text-secondary">Brands</p>
        </Card>
      </Col>
      <Col md={4} className="mb-4">
        <Card className="text-center p-4">
          <FaChartBar size={50} className="text-info mb-3" />
          <h3>4</h3>
          <p className="text-secondary">Categories</p>
        </Card>
      </Col>
    </Row>
  </div>
);

const ManageBikes = () => (
  <div>
    <h2 className="mb-4">Manage Bikes</h2>
    <Card className="p-4">
      <p className="text-secondary">
        Bike management interface would go here. Features include:
      </p>
      <ul>
        <li>Add new bikes</li>
        <li>Edit existing bikes</li>
        <li>Delete bikes</li>
        <li>Upload images</li>
        <li>Manage specifications</li>
      </ul>
    </Card>
  </div>
);

const ManageBrands = () => (
  <div>
    <h2 className="mb-4">Manage Brands</h2>
    <Card className="p-4">
      <p className="text-secondary">
        Brand management interface would go here. Features include:
      </p>
      <ul>
        <li>Add new brands</li>
        <li>Edit brand information</li>
        <li>Delete brands</li>
        <li>Upload brand logos</li>
      </ul>
    </Card>
  </div>
);

const Admin = () => {
  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} lg={2} className="mb-4">
          <Card className="p-3">
            <h5 className="mb-3">Admin Panel</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/admin/dashboard" className="text-start">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/bikes" className="text-start">
                Manage Bikes
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/brands" className="text-start">
                Manage Brands
              </Nav.Link>
            </Nav>
          </Card>
        </Col>

        <Col md={9} lg={10}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/bikes" element={<ManageBikes />} />
            <Route path="/brands" element={<ManageBrands />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
