import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import Navbare from '../../composants/Navbare/Navbare';
import axios from 'axios';
import { Toaster } from 'sonner';

import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    confirmes: 0,
    annules: 0
  });

  const [appointments, setAppointments] = useState([]);

  // Calculer les statistiques à partir des rendez-vous
  const calculateStats = (appointments) => {
    if (!Array.isArray(appointments)) return;
    
    const total = appointments.length;
    const enAttente = appointments.filter(apt => 
      apt.status !== 'confirmé' && apt.status !== 'Confirmé' && 
      apt.status !== 'annulé' && apt.status !== 'Annulé').length;
    const confirmes = appointments.filter(apt => 
      apt.status === 'confirmé' || apt.status === 'Confirmé').length;
    const annules = appointments.filter(apt => 
      apt.status === 'annulé' || apt.status === 'Annulé').length;
    
    setStats({ total, enAttente, confirmes, annules });
  };

  // Charger les rendez-vous
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointment/appointments");
        if (response.data && Array.isArray(response.data)) {
          const aptsWithStatus = response.data.map(apt => ({
            ...apt,
            status: apt.status || 'en attente' // Ajouter status par défaut si n'existe pas
          }));
          setAppointments(aptsWithStatus);
          calculateStats(aptsWithStatus);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous", error);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusBadge = (status) => {
    if (status === 'confirmé' || status === 'Confirmé') {
      return <span className="badge bg-success">Confirmé</span>;
    } else if (status === 'annulé' || status === 'Annulé') {
      return <span className="badge bg-danger">Annulé</span>;
    } else {
      return <span className="badge bg-warning text-dark">En attente</span>;
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="dashboard-page">
      <Navbare/>
      <Toaster position="top-right" />
      <Container className= "py-5 mt-5 aida "  >
        <h1 className="text-center mb-5  mt-5 ">Tableau de bord</h1>
        
        {/* Cartes statistiques */}
        <Row>
          <Col md={3}>
            <Card className="mb-4 text-center">
              <Card.Body>
                <Card.Title>Total Rendez-vous</Card.Title>
                <h2 className="display-4">{stats.total}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center bg-warning text-dark">
              <Card.Body>
                <Card.Title>En attente</Card.Title>
                <h2 className="display-4">{stats.enAttente}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center bg-success text-white">
              <Card.Body>
                <Card.Title>Confirmés</Card.Title>
                <h2 className="display-4">{stats.confirmes}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center bg-danger text-white">
              <Card.Body>
                <Card.Title>Annulés</Card.Title>
                <h2 className="display-4">{stats.annules}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
