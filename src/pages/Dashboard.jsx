import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  if (!user) {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <h2>Please login to view dashboard</h2>
          <Button as={Link} to="/login" variant="primary" className="mt-3">
            Go to Login
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  // Admin Dashboard
  if (user.role === 'admin') {
    return (
      <>
        <Navbar />
        <Container className="py-4">
          <h1 className="fw-bold mb-4">Admin Dashboard</h1>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <i className="bi bi-building fs-1 text-primary"></i>
                  <h3 className="mt-3">Pending Schools</h3>
                  <p className="display-4 fw-bold">2</p>
                  <Button variant="outline-primary" size="sm">Review Schools</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <i className="bi bi-people fs-1 text-success"></i>
                  <h3 className="mt-3">Pending Verifications</h3>
                  <p className="display-4 fw-bold">5</p>
                  <Button variant="outline-success" size="sm">Verify Users</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <i className="bi bi-cash-stack fs-1 text-warning"></i>
                  <h3 className="mt-3">Total Revenue</h3>
                  <p className="display-4 fw-bold">₱0</p>
                  <Button variant="outline-warning" size="sm">View Reports</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  // Tutor Dashboard
  if (user.role === 'tutor') {
    return (
      <>
        <Navbar />
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold">Welcome back, {user.name}!</h1>
            <Badge bg="success" className="px-3 py-2">
              <i className="bi bi-star-fill me-1"></i> Tutor
            </Badge>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <i className="bi bi-calendar-check fs-1 text-primary"></i>
                  <h3 className="mt-2">Upcoming Sessions</h3>
                  <p className="display-4 fw-bold">0</p>
                  <Button variant="outline-primary" size="sm">View Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <i className="bi bi-cash-stack fs-1 text-success"></i>
                  <h3 className="mt-2">Total Earnings</h3>
                  <p className="display-4 fw-bold">₱0</p>
                  <Button variant="outline-success" size="sm">Request Payout</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <i className="bi bi-person-badge fs-1 text-info"></i>
                  <h3 className="mt-2">Profile Status</h3>
                  <p className="fw-bold text-warning">Incomplete</p>
                  <Button variant="outline-info" size="sm">Complete Profile</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Quick Actions</h5>
              <div className="d-flex gap-2 mt-3">
                <Button variant="primary">Find Students</Button>
                <Button variant="outline-secondary">Manage Availability</Button>
                <Button variant="outline-secondary">Request Teacher Endorsement</Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
        <Footer />
      </>
    );
  }

  // Tutee Dashboard
  return (
    <>
      <Navbar />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Welcome back, {user.name}!</h1>
          <Badge bg="primary" className="px-3 py-2">
            <i className="bi bi-book me-1"></i> Tutee
          </Badge>
        </div>
        
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <i className="bi bi-calendar-check fs-1 text-primary"></i>
                <h3 className="mt-2">Upcoming Sessions</h3>
                <p className="display-4 fw-bold">0</p>
                <Button variant="outline-primary" size="sm">View Schedule</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <i className="bi bi-clock-history fs-1 text-info"></i>
                <h3 className="mt-2">Hours Learned</h3>
                <p className="display-4 fw-bold">0</p>
                <Button variant="outline-info" size="sm">View History</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <i className="bi bi-star fs-1 text-warning"></i>
                <h3 className="mt-2">Total Spent</h3>
                <p className="display-4 fw-bold">₱0</p>
                <Button variant="outline-warning" size="sm">View Receipts</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Card className="mt-4 shadow-sm bg-primary bg-opacity-10">
          <Card.Body className="text-center">
            <h5 className="fw-bold">Ready to learn?</h5>
            <p className="mb-3">Find the perfect tutor from your school</p>
            <Button variant="primary" size="lg" onClick={ () => navigate('/search') }>
              <i className="bi bi-search me-2"></i>Find a Tutor
            </Button>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;