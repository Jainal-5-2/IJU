import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SchoolLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password, 'school_admin');
      
      if (result.success) {
        navigate('/school/dashboard');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="bi bi-building fs-1 text-primary"></i>
                  <h2 className="fw-bold mt-3">School Admin Login</h2>
                  <p className="text-secondary">Access your school dashboard</p>
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
                      <i className="bi bi-envelope me-2"></i>School Admin Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@lincoln.edu"
                      required
                    />
                    <Form.Text className="text-muted">
                      Demo: admin@lincoln.edu (password: school123)
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-lock me-2"></i>Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>Logging in...</>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>Login as School Admin
                      </>
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <a href="/login" className="text-decoration-none">
                      <i className="bi bi-person me-1"></i>
                      Student login instead?
                    </a>
                  </div>
                </Form>

                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    <strong>Demo school admin accounts:</strong><br />
                    📧 admin@lincoln.edu (Approved school)<br />
                    📧 admin@washington.edu (Pending approval)<br />
                    <em>Password for all: school123</em>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SchoolLogin;