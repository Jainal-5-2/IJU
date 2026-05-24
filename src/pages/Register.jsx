import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockSchools } from '../mock/mock_data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const { registerStudent } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    schoolId: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [approvedSchools, setApprovedSchools] = useState([]);

  useEffect(() => {
    const approved = mockSchools.filter(school => school.status === 'approved');
    setApprovedSchools(approved);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setStep(2);
  };

  const handleSchoolSelect = () => {
    if (!formData.schoolId) {
      setError('Please select a school');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const result = registerStudent({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        schoolId: parseInt(formData.schoolId)
      });
      
      if (result.success) {
        setSuccess(`Registration successful! Your account is pending verification by ${approvedSchools.find(s => s.id == formData.schoolId)?.name} admin. You'll be able to login once verified.`);
        setStep(4); // Show success page
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 1000);
  };

  // Step 1: Select Role
  if (step === 1) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <div className="text-center mb-4">
                    <i className="bi bi-person-plus fs-1 text-primary"></i>
                    <h2 className="fw-bold mt-3">Join IJU</h2>
                    <p className="text-secondary">Choose how you want to use the platform</p>
                  </div>
                  
                  <Row className="g-3">
                    <Col sm={6}>
                      <Card 
                        className="text-center h-100 cursor-pointer border-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRoleSelect('tutee')}
                      >
                        <Card.Body className="p-4">
                          <i className="bi bi-book fs-1 text-primary"></i>
                          <h4 className="fw-bold mt-3 mb-2">Tutee</h4>
                          <p className="text-secondary small mb-0">
                            I want to learn from tutors
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    
                    <Col sm={6}>
                      <Card 
                        className="text-center h-100 cursor-pointer border-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRoleSelect('tutor')}
                      >
                        <Card.Body className="p-4">
                          <i className="bi bi-cash-stack fs-1 text-success"></i>
                          <h4 className="fw-bold mt-3 mb-2">Tutor</h4>
                          <p className="text-secondary small mb-0">
                            I want to earn by teaching
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  // Step 2: Select School
  if (step === 2) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <div className="mb-4">
                    <Button 
                      variant="link" 
                      className="p-0 mb-3 text-decoration-none"
                      onClick={() => setStep(1)}
                    >
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </Button>
                    <div className="text-center">
                      <i className="bi bi-building fs-1 text-primary"></i>
                      <h2 className="fw-bold mt-3">Select Your School</h2>
                      <p className="text-secondary">
                        Only approved schools can join
                      </p>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="danger" className="mb-4">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                    </Alert>
                  )}
                  
                  <Form>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">School</Form.Label>
                      <Form.Select
                        name="schoolId"
                        value={formData.schoolId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select your school...</option>
                        {approvedSchools.map(school => (
                          <option key={school.id} value={school.id}>
                            {school.name} ({school.emailDomain})
                          </option>
                        ))}
                      </Form.Select>
                      {approvedSchools.length === 0 && (
                        <Form.Text className="text-danger">
                          No approved schools yet. Schools must be registered first.
                        </Form.Text>
                      )}
                    </Form.Group>
                    
                    <div className="text-center">
                      <Link to="/school/register" className="text-decoration-none small">
                        <i className="bi bi-plus-circle me-1"></i>
                        Don't see your school? Register it here
                      </Link>
                    </div>
                    
                    <Button 
                      onClick={handleSchoolSelect}
                      variant="primary" 
                      size="lg" 
                      className="w-100 mt-4"
                      disabled={!formData.schoolId}
                    >
                      Continue
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  // Step 3: Account Details
  if (step === 3) {
    const selectedSchool = approvedSchools.find(s => s.id == formData.schoolId);
    
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <div className="mb-4">
                    <Button 
                      variant="link" 
                      className="p-0 mb-3 text-decoration-none"
                      onClick={() => setStep(2)}
                    >
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </Button>
                    <div className="text-center">
                      <i className="bi bi-person-check fs-1 text-primary"></i>
                      <h2 className="fw-bold mt-3">Create Account</h2>
                      <p className="text-secondary">
                        {formData.role === 'tutor' ? 'Start earning by teaching' : 'Start learning today'}
                      </p>
                      <Badge bg={formData.role === 'tutor' ? 'success' : 'primary'} className="mb-3">
                        {formData.role === 'tutor' ? 'Tutor Account' : 'Tutee Account'}
                      </Badge>
                      {selectedSchool && (
                        <p className="small text-muted">
                          <i className="bi bi-building me-1"></i>
                          School: {selectedSchool.name}
                        </p>
                      )}
                    </div>
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
                        <i className="bi bi-person me-2"></i>Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-envelope me-2"></i>School Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={`yourname${selectedSchool?.emailDomain || '@school.edu'}`}
                        required
                      />
                      <Form.Text className="text-muted">
                        Must use your school email address
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-lock me-2"></i>Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-lock-fill me-2"></i>Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
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
                        <>Creating account...</>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>Sign Up
                        </>
                      )}
                    </Button>

                    <div className="text-center mt-4">
                      <Link to="/login" className="text-decoration-none">
                        Already have an account? Login here
                      </Link>
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
  }

  // Step 4: Success (Pending Verification)
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0 text-center">
              <Card.Body className="p-5">
                <i className="bi bi-envelope-check fs-1 text-warning mb-3"></i>
                <h2 className="fw-bold mb-3">Registration Submitted!</h2>
                <p className="lead text-secondary mb-4">
                  {success}
                </p>
                <div className="bg-light p-3 rounded mb-4">
                  <i className="bi bi-clock-history me-2"></i>
                  <small>You will receive an email once your school admin verifies your account.</small>
                </div>
                <Button variant="primary" onClick={() => navigate('/login')} className="px-4">
                  Go to Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Register;