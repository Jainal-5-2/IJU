import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
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
      const result = login(email, password, 'student');
      
      if (result.success) {
        if (result.user.role === 'tutor') {
          navigate('/tutor/dashboard');
        } else {
          navigate('/tutee/dashboard');
        }
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
                  <i className="bi bi-person fs-1 text-primary"></i>
                  <h2 className="fw-bold mt-3">Student Login</h2>
                  <p className="text-secondary">Access your learning or tutoring account</p>
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
                      <i className="bi bi-envelope me-2"></i>School Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@lincoln.edu"
                      required
                    />
                    <Form.Text className="text-muted">
                      Use your school email address
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
                        <i className="bi bi-box-arrow-in-right me-2"></i>Login as Student
                      </>
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <Link to="/register" className="text-decoration-none">
                      Don't have an account? Sign up here
                    </Link>
                  </div>
                  
                  <div className="text-center mt-2">
                    <Link to="/school/login" className="text-decoration-none small">
                      <i className="bi bi-building me-1"></i>
                      School admin login instead?
                    </Link>
                  </div>
                </Form>

                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    <strong>Demo student accounts:</strong><br />
                    📧 student@lincoln.edu (Tutee - Verified)<br />
                    📧 tutor@lincoln.edu (Tutor - Verified)<br />
                    📧 pending@lincoln.edu (Pending verification)<br />
                    <em>Any password works</em>
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

export default Login;