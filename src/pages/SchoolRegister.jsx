import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SchoolRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    emailDomain: '',
    contactEmail: '',
    phone: '',
    address: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email domain format (must start with @)
    if (!formData.emailDomain.startsWith('@')) {
      setError('Email domain must start with @ (e.g., @school.edu)');
      return;
    }
    
    // In real app, this would save to backend
    // For now, save to localStorage as pending
    const pendingSchools = JSON.parse(localStorage.getItem('iju_pending_schools') || '[]');
    pendingSchools.push({
      id: Date.now(),
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('iju_pending_schools', JSON.stringify(pendingSchools));
    
    setSubmitted(true);
    setError('');
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0 text-center">
                <Card.Body className="p-5">
                  <i className="bi bi-envelope-check fs-1 text-success mb-3"></i>
                  <h2 className="fw-bold mb-3">Registration Submitted!</h2>
                  <p className="lead text-secondary mb-4">
                    Your school has been registered and is pending admin approval.
                  </p>
                  <div className="bg-light p-3 rounded mb-4">
                    <i className="bi bi-clock-history me-2"></i>
                    <small>You'll receive an email once your school is approved.</small>
                  </div>
                  <Button variant="primary" onClick={() => navigate('/')} className="px-4">
                    Return to Home
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="bi bi-building fs-1 text-primary"></i>
                  <h2 className="fw-bold mt-3">Register Your School</h2>
                  <p className="text-secondary">
                    Get your school on IJU and enable student-to-student tutoring
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-building me-2"></i>School Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="e.g., Lincoln High School"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-at me-2"></i>Email Domain
                    </Form.Label>
                      <Form.Control
                      type="text"
                      name="emailDomain"
                      value={formData.emailDomain}
                      onChange={handleChange}
                      placeholder="@school.edu"
                      required
                    />
                    <Form.Text className="text-muted">
                      Students must have emails ending with this domain
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-envelope me-2"></i>Contact Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="admin@school.edu"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-telephone me-2"></i>Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-geo-alt me-2"></i>School Address
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Street, City, State, ZIP"
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" size="lg" className="w-100">
                    <i className="bi bi-check-circle me-2"></i>Register School
                  </Button>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      <i className="bi bi-shield-check me-1"></i>
                      All registrations are reviewed by our team within 24-48 hours
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SchoolRegister;