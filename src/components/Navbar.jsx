import { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useAuth();

  return (
    <BootstrapNavbar
      expanded={expanded}
      expand="lg"
      className="bg-white shadow-sm py-3"
      sticky="top"
    >
      <Container>
        <BootstrapNavbar.Brand href="/" className="fw-bold fs-3">
          <i className="bi bi-mortarboard-fill text-primary me-2"></i>
          IJU
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        >
          <i className="bi bi-list fs-2"></i>
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link
              href="/"
              className="px-3 fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#how-it-works"
              className="px-3 fw-semibold"
              onClick={() => setExpanded(false)}
            >
              How It Works
            </Nav.Link>
            <Nav.Link
              href="#features"
              className="px-3 fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Features
            </Nav.Link>
            {!user && (
              <>
                <NavDropdown title="Login" id="login-dropdown" align="end">
                  <NavDropdown.Item href="/login">
                    <i className="bi bi-person me-2"></i> Student Login
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/school/login">
                    <i className="bi bi-building me-2"></i> School Admin Login
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Sign Up" id="signup-dropdown" align="end">
                  <NavDropdown.Item href="/register">
                    <i className="bi bi-book me-2"></i> Sign up as Student
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/school/register">
                    <i className="bi bi-building me-2"></i> Register your School
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {user && (
              <>
                <Nav.Link
                  href="#"
                  onClick={() => {
                    logout();
                    setExpanded(false);
                  }}
                  className="text-danger"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
