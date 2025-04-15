
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import Navbare from "../../composants/Navbare/Navbare";

function Patient() {
  const patients = [
    { id: 1, name: "Jean Dupont", age: 45, phone: "01 23 45 67 89", email: "jean.dupont@example.com" },
    { id: 2, name: "Marie Martin", age: 32, phone: "01 23 45 67 90", email: "marie.martin@example.com" },
    { id: 3, name: "Pierre Durand", age: 28, phone: "01 23 45 67 91", email: "pierre.durand@example.com" },
  ];

  return (
    <div className="patient">
      <Navbare />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center mb-4">Gestion des Patients</h1>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Âge</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(patient => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.phone}</td>
                        <td>{patient.email}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            Modifier
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Patient;
