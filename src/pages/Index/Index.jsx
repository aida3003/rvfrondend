
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import ImageSlider from "../../composants/ImageSlider";
import TextMarquee from "../../composants/TextMarquee";
import logo from "../../assets/logo.png";

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #e2f8fe, #e2f8fe)", color: "white" }}>

      {/* Navbar */}
      <Navbar bg="light" expand="md" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
                   <img
                     src={logo}
                     alt="Sunu Wergi Yaram"
                     width="50"
                     height="50"
                     className="d-inline-block align-top rounded-circle"
                   />
                   <span className="brand-text">Sunu Wergi Yaram</span>
                 </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">
                <Button variant="success" className="me-2">SE CONNECTER</Button>
              </Nav.Link>
              <Nav.Link href="/signup">
                <Button variant="primary">INSCRIPTION</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container style={{ paddingTop: "120px", paddingBottom: "40px" }}>
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{ background: "linear-gradient(to right, #22c55e, #3b82f6)", WebkitBackgroundClip: "text", color: "transparent" }}>
            Sunu Wergi Yaram
          </h1>
          <p className="text-secondary">Bienvenue dans notre espace de santé</p>
        </header>

        <main>
          <Row className="g-4">
            <Col md={6}>
              <div style={{ height: "500px" }}>
                <ImageSlider />
              </div>
            </Col>
            <Col md={6} className="position-relative">
              <div style={{ height: "500px" }}>
                <TextMarquee />
                <div className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-center pb-4">
                  <Button size="lg" variant="success">
                    PRENDRE UN RENDEZ-VOUS
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </main>

        <footer className="text-center text-muted mt-5">
          <p>Created with ✨ magical code powers</p>
        </footer>
      </Container>
    </div>
  );
};

export default Index;
