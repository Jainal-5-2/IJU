import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary-to-white py-5 py-md-6">
        <Container>
          <Row className="align-items-center min-vh-75 py-5">
            <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
              <Badge bg="primary" className="mb-4 px-3 py-2 rounded-pill">
                <i className="bi bi-shield-check me-1"></i> School-Locked Platform
              </Badge>
              <h1 className="display-3 fw-bold mb-4">
                One <span className="text-primary">Learns</span>.<br />
                One <span className="text-success">Earns</span>.
              </h1>
              <p className="lead text-secondary mb-4">
                Student-to-student tutoring within your own school. 
                Teacher-endorsed, community-rated, and completely trusted.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Button size="lg" variant="primary" className="px-5 py-3 rounded-pill fw-semibold">
                  <i className="bi bi-book me-2"></i> I want to learn
                </Button>
                <Button size="lg" variant="outline-success" className="px-5 py-3 rounded-pill fw-semibold">
                  <i className="bi bi-cash-stack me-2"></i> I want to earn
                </Button>
              </div>
              <div className="mt-4 d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start">
                <small><i className="bi bi-check-circle-fill text-success me-1"></i> Online or offline</small>
                <small><i className="bi bi-check-circle-fill text-success me-1"></i> Teacher-endorsed</small>
                <small><i className="bi bi-check-circle-fill text-success me-1"></i> Your school only</small>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="bg-light rounded-4 p-4 shadow-sm">
                <i className="bi bi-people-fill text-primary display-1"></i>
                <h3 className="mt-3">Trusted by students</h3>
                <p className="text-secondary">Join hundreds of students learning from their schoolmates</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">
              Simple Process
            </Badge>
            <h2 className="display-5 fw-bold mb-3">How IJU Works</h2>
            <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Three simple steps to start learning or earning
            </p>
          </div>

          <Row className="gy-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3">
                    <i className="bi bi-envelope-check fs-1 text-primary"></i>
                  </div>
                  <h4 className="fw-bold mb-3">1. Register with school</h4>
                  <p className="text-secondary">
                    Sign up using your school email or student ID. School must be approved first.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3">
                    <i className="bi bi-star-fill fs-1 text-success"></i>
                  </div>
                  <h4 className="fw-bold mb-3">2. Find endorsed tutor</h4>
                  <p className="text-secondary">
                    Search by subject, availability, or endorsement status. Book your session.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3">
                    <i className="bi bi-calendar-check fs-1 text-info"></i>
                  </div>
                  <h4 className="fw-bold mb-3">3. Book & learn</h4>
                  <p className="text-secondary">
                    Pay securely, attend session (online or offline), confirm, and rate.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">
              Platform Features
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
            <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Built for students, trusted by teachers
            </p>
          </div>

          <Row className="gy-4">
            <Col sm={6} lg={3}>
              <div className="text-center p-3">
                <i className="bi bi-person-badge fs-1 text-primary"></i>
                <h5 className="fw-bold mt-3 mb-2">Teacher Endorsement</h5>
                <p className="small text-secondary">Get verified by your teachers for academic competence</p>
              </div>
            </Col>

            <Col sm={6} lg={3}>
              <div className="text-center p-3">
                <i className="bi bi-star-fill fs-1 text-warning"></i>
                <h5 className="fw-bold mt-3 mb-2">Rating System</h5>
                <p className="small text-secondary">Rate tutors on knowledge, clarity, and punctuality</p>
              </div>
            </Col>

            <Col sm={6} lg={3}>
              <div className="text-center p-3">
                <i className="bi bi-shield-lock fs-1 text-success"></i>
                <h5 className="fw-bold mt-3 mb-2">Secure Payments</h5>
                <p className="small text-secondary">Platform holds payment until session is confirmed</p>
              </div>
            </Col>

            <Col sm={6} lg={3}>
              <div className="text-center p-3">
                <i className="bi bi-geo-alt fs-1 text-info"></i>
                <h5 className="fw-bold mt-3 mb-2">Online or Offline</h5>
                <p className="small text-secondary">Choose virtual sessions or meet at school</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* For Tutors Section */}
      <section className="py-5 bg-success bg-opacity-10" id='for-tutors'>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-lg-2">
              <div className="p-4">
                <Badge bg="success" className="mb-3 px-3 py-2 rounded-pill">
                  <i className="bi bi-cash-stack me-1"></i> For Tutors
                </Badge>
                <h2 className="fw-bold mb-4">One Earns. Keep 100%.</h2>
                <ul className="list-unstyled">
                  <li className="mb-3"><i className="bi bi-check-lg text-success me-2"></i> Set your own hourly rate</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-success me-2"></i> Get teacher endorsement badge</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-success me-2"></i> Platform fee paid by tutee, not you</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-success me-2"></i> Weekly payouts to GCash or bank</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-success me-2"></i> Build your tutoring reputation</li>
                </ul>
                <Button variant="success" size="lg" className="rounded-pill px-5 mt-3">
                  Start earning now <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </div>
            </Col>
            <Col lg={6} className="order-lg-1">
              <div className="text-center p-4">
                <i className="bi bi-graph-up fs-1 text-success"></i>
                <div className="bg-white rounded-3 p-4 shadow-sm mt-3">
                  <h4 className="fw-bold text-success">Example earnings</h4>
                  <p className="display-6 fw-bold">₱300-500<span className="fs-6">/hour</span></p>
                  <p className="text-secondary">Average tutor rate in your school</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* For Tutees Section */}
      <section className="py-5 bg-primary bg-opacity-10" id='for-tutees'>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="p-4">
                <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">
                  <i className="bi bi-book me-1"></i> For Tutees
                </Badge>
                <h2 className="fw-bold mb-4">One Learns. Learn from the best.</h2>
                <ul className="list-unstyled">
                  <li className="mb-3"><i className="bi bi-check-lg text-primary me-2"></i> Only verified schoolmates as tutors</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-primary me-2"></i> Teacher-endorsed tutors only</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-primary me-2"></i> Rate tutors after every session</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-primary me-2"></i> Secure payment - pay only when confirmed</li>
                  <li className="mb-3"><i className="bi bi-check-lg text-primary me-2"></i> Sessions online or at school</li>
                </ul>
                <Button variant="primary" size="lg" className="rounded-pill px-5 mt-3">
                  Start learning now <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center p-4">
                <i className="bi bi-trophy fs-1 text-primary"></i>
                <div className="bg-white rounded-3 p-4 shadow-sm mt-3">
                  <div className="d-flex justify-content-center gap-1 mb-3">
                    {[1,2,3,4,5].map((star) => (
                      <i key={star} className="bi bi-star-fill text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="fw-bold">"Found a tutor who helped me pass Calculus!"</p>
                  <p className="text-secondary small">- Maria, Grade 11 student</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">
              Quality Assurance
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Two Layers of Trust</h2>
            <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Every tutor goes through double verification
            </p>
          </div>

          <Row className="gy-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-person-check fs-1 text-primary"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Layer 1: Teacher Endorsement</h4>
                  <p className="text-secondary">
                    Tutors request endorsement from their teachers. 
                    This confirms academic competence and subject mastery.
                  </p>
                  <Badge bg="primary" className="mt-2">Verified competence</Badge>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-star-half fs-1 text-warning"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Layer 2: Rating System</h4>
                  <p className="text-secondary">
                    After each session, tutees rate tutors on knowledge, 
                    clarity, punctuality, and overall performance.
                  </p>
                  <Badge bg="warning" className="mt-2">Verified accountability</Badge>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to start your journey?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Join your school's trusted tutoring community today
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Button variant="light" size="lg" className="rounded-pill px-5 py-3 fw-semibold text-primary">
              <i className="bi bi-person-plus me-2"></i> Sign up as Tutee
            </Button>
            <Button variant="outline-light" size="lg" className="rounded-pill px-5 py-3 fw-semibold">
              <i className="bi bi-cash me-2"></i> Sign up as Tutor
            </Button>
          </div>
          <p className="mt-4 small">
            <i className="bi bi-shield-check me-1"></i> Free to join. Your school must be registered.
          </p>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Landing;