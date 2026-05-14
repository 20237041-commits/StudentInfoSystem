import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4 py-3">
      <Container>

        <Nav className="me-auto d-none d-lg-flex gap-2">
          <Button
            variant={location.pathname === '/' ? 'info' : 'outline-info'}
            size="sm"
            onClick={() => navigate('/')}
            className="px-3 rounded-pill"
          >
            Home
          </Button>
          <Button
            variant={location.pathname === '/dashboard' ? 'info' : 'outline-info'}
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="px-3 rounded-pill"
          >
            Dashboard
          </Button>
        </Nav>

        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold mx-auto text-uppercase tracking-wider"
          style={{ letterSpacing: '1px' }}
        >
          Student Information
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/student/new')}
            className="px-3 shadow-sm fw-semibold"
          >
            + Add Student
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
