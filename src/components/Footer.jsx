import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white-50 py-5 mt-5">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={4}>
            <div className="mb-3">
              <i className="bi bi-mortarboard-fill text-primary fs-2 me-2"></i>
              <span className="fs-4 fw-bold text-white">IJU</span>
            </div>
            <p className="small">School-locked, student-to-student tutoring platform. One learns, one earns.</p>
            <div className="d-flex gap-3">
              <i className="bi bi-facebook fs-5"></i>
              <i className="bi bi-twitter fs-5"></i>
              <i className="bi bi-instagram fs-5"></i>
              <i className="bi bi-linkedin fs-5"></i>
            </div>
          </Col>
          
          <Col xs={6} md={2}>
            <h6 className="text-white fw-bold mb-3">Platform</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#how-it-works" className="text-white-50 text-decoration-none">How it works</a></li>
              <li className="mb-2"><a href="#for-tutees" className="text-white-50 text-decoration-none">For tutees</a></li>
              <li className="mb-2"><a href="#for-tutors" className="text-white-50 text-decoration-none">For tutors</a></li>
              <li className="mb-2"><a href="#for-tutors" className="text-white-50 text-decoration-none">Pricing</a></li>
            </ul>
          </Col>
          
          <Col xs={6} md={2}>
            <h6 className="text-white fw-bold mb-3">Support</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Help center</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Safety guidelines</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contact us</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Report issue</a></li>
            </ul>
          </Col>
          
          <Col xs={12} md={4}>
            <h6 className="text-white fw-bold mb-3">School verification</h6>
            <p className="small">Your school email or student ID keeps our community safe and trusted.</p>
            <div className="input-group">
              <input type="email" className="form-control form-control-sm" placeholder="Your school email" />
              <button className="btn btn-primary btn-sm">Notify me</button>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        <div className="text-center small">
          <span>© 2026 IJU. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;