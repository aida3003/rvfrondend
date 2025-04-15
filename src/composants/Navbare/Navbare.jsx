import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaChartBar, FaUserMd, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa';
import './Navbare.css';
import logo from '../../assets/logo.png';

function Navbare() {
  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm py-3 custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="Sunu Wergi Yaram"
            width="60"
            height="60"
            className="d-inline-block align-top rounded-circle"
          />
          <span className="brand-text fw-bold fs-4 text-primary">Sunu Wergi Yaram</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-4">
            <Nav.Link href="/" className="d-flex align-items-center gap-2">
              <FaHome /> Accueil
            </Nav.Link>
            <Nav.Link href="/dashboard" className="d-flex align-items-center gap-2">
              <FaChartBar /> Tableau de bord
            </Nav.Link>
            <Nav.Link href="/medecin" className="d-flex align-items-center gap-2">
              <FaUserMd /> Voir des Médecins
            </Nav.Link>
            <Nav.Link href="/rv" className="d-flex align-items-center gap-2">
              <FaCalendarCheck /> Mes rendez-vous
            </Nav.Link>
            <Nav.Link href="/" className="btn btn-outline-danger d-flex align-items-center gap-2 fw-semibold">
              <FaSignOutAlt /> Déconnexion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbare;
