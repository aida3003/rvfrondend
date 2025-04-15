import "./Accueil.css";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import logo from "../../assets/logo.png";

function Accueil() {
  return (
    <div className="accueil">
        <Navbar bg="white" expand="lg" fixed="top" className="py-3">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-3">
          
          <img
            src={logo}
            alt="Logo"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="/login" className="btn btn-connect ms-lg-3">
              SE CONNECTER
            </Nav.Link>
            <Nav.Link href="/signup" className="btn btn-connect ms-lg-3">
              INSCRIPTION
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
       <div 
        className="hero-section"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1344935909/fr/vectoriel/homme-%C3%A0-la-r%C3%A9ception-%C3%A0-lint%C3%A9rieur-de-lh%C3%B4pital-illustration-de-dessin-anim%C3%A9-vectorielle.jpg?s=2048x2048&w=is&k=20&c=UhGaMcbv4QzBqP1jpHtGhAhjigF6OdAJ_eMoLBdvFkQ=')`
        }}
      >
        <div className="hero-overlay">
          <Container className="h-100 d-flex flex-column justify-content-center align-items-center text-center text-white w-1/2">
         <marquee>   <h1 className="display-4 fw-bold mb-4">Sunu Wergi Yaram</h1></marquee>
            <p className="fs-5 mb-4">Le Bouton ci-dessous vous permettra de prendre Rendez-vous</p>
            <Button 
              variant="success" 
              size="lg" 
              className="btn-connect px-5"
            >
              PRENDRE UN RENDEZ-VOUS
            </Button>
          </Container>
          <div>

          </div>
        </div>
      </div>
       
    </div>
  );
};

export default Accueil;
