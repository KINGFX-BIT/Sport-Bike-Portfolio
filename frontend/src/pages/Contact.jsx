import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-3 mb-3">Contact Us</h1>
        <p className="lead text-secondary">
          Have questions? We'd love to hear from you!
        </p>
      </div>

      <Row>
        <Col lg={8} className="mb-4">
          <Card className="p-4">
            <Card.Body>
              <h3 className="mb-4">Send us a Message</h3>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={6}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg"
                  disabled={loading}
                >
                  <FaPaperPlane className="me-2" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="p-4 mb-4">
            <Card.Body>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope size={24} className="text-primary me-3" />
                  <div>
                    <h6 className="mb-1">Email</h6>
                    <p className="text-secondary mb-0">info@sportbikes.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <FaPhone size={24} className="text-primary me-3" />
                  <div>
                    <h6 className="mb-1">Phone</h6>
                    <p className="text-secondary mb-0">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt size={24} className="text-primary me-3" />
                  <div>
                    <h6 className="mb-1">Address</h6>
                    <p className="text-secondary mb-0">
                      123 Bike Street<br />
                      Motor City, MC 12345
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="p-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--hover-color))' }}>
            <Card.Body className="text-center">
              <h4 className="mb-3">Business Hours</h4>
              <p className="mb-2"><strong>Monday - Friday</strong></p>
              <p className="mb-3">9:00 AM - 6:00 PM</p>
              <p className="mb-2"><strong>Saturday</strong></p>
              <p className="mb-3">10:00 AM - 4:00 PM</p>
              <p className="mb-2"><strong>Sunday</strong></p>
              <p className="mb-0">Closed</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
