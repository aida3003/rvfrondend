import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Navbare from "../../composants/Navbare/Navbare";
import { User, Mail, Phone, Building, UserCog } from 'lucide-react';

function Medecin() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    specialization: ''
  });

  // Charger les médecins au montage
  useEffect(() => {
    fetch("http://localhost:5000/api/medecins")    // Assurez-vous que le chemin est correct
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error(err));
  }, []);

  // Gérer les changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.specialization) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    // Envoi des données au backend pour ajouter un médecin
    fetch("http://localhost:5000/api/medecins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newDoctor => {
        // Ajouter le nouveau médecin à la liste sans recharger la page
        setDoctors(prev => [...prev, newDoctor]);

        // Réinitialiser les données du formulaire
        setFormData({ name: '', email: '', phone: '', service: '', specialization: '' });
        alert("Médecin ajouté avec succès !");
      })
      .catch(err => {
        console.error(err);
        alert("Erreur lors de l'ajout du médecin");
      });
  };

  // Supprimer un médecin
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/medecins/${id}`, { method: "DELETE" })
      .then(() => setDoctors(prev => prev.filter(doctor => doctor._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="medecin">
      <Navbare />
      <Container className="py-5"  style={{ backgroundColor: "#f8f9fa" }} >
        <h1 className="text-center mb-5">Gestion des Médecins</h1>
        
        <Row>
          <Col md={5}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="h4 mb-4">Ajouter un médecin</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <User size={18} className="me-2" />
                      Nom complet
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Entrez le nom complet"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <Mail size={18} className="me-2" />
                      E-mail
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Entrez l'adresse e-mail"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <Phone size={18} className="me-2" />
                      Téléphone
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Entrez le numéro de téléphone"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <Building size={18} className="me-2" />
                      Service
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      placeholder="Entrez le service"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <UserCog size={18} className="me-2" />
                      Spécialisation
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      required
                      placeholder="Entrez la spécialisation"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Ajouter le médecin
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="h4 mb-4">Liste des médecins</h2>
                {doctors.length === 0 ? (
                  <p className="text-muted text-center py-4">Aucun médecin enregistré</p>
                ) : (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Service</th>
                        <th>Spécialisation</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.map(doctor => (
                        <tr key={doctor._id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.service}</td>
                          <td>{doctor.specialization}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(doctor._id)}
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Medecin;
