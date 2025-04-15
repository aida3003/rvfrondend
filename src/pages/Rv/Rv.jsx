import  { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbare from '../../composants/Navbare/Navbare';
import AppointmentForm from '../../composants/AppointmentForm';
import AppointmentList from '../../composants/AppointmentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Toaster } from 'sonner';




function Rv() {
  const [appointments, setAppointments] = useState([
    // Données de démonstration
    {
      _id: '1',
      patientName: 'QBBNN?',
      doctorName: 'aida',
      service: 'Cardiologie',
      date: '2025-04-25',
      time: '14:42',
      status: 'confirmé'
    }
    
  ]);

  // Récupérer la liste des rendez-vous au montage du composant
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointment/appointments");
        if (response.data && Array.isArray(response.data)) {
          // Si l'API retourne des données, remplacer les données de démo
          setAppointments(response.data.map(apt => ({
            ...apt,
            status: apt.status || 'en attente' // Ajouter status par défaut si n'existe pas
          })));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous", error);
        // Garder les données de démo en cas d'erreur
      }
    };

    fetchAppointments();
  }, []);

  const handleNewAppointment = (appointment) => {
    setAppointments(prevAppointments => [...prevAppointments, appointment]);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    // Mise à jour locale immédiate pour une meilleure expérience utilisateur
    setAppointments(prevAppointments => 
      prevAppointments.map(apt => 
        apt._id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  return (
    <div className="rv-page">
      <Navbare />
      <Toaster position="top-right" />
      <Container className="py-5 mt-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Row>
          <Col lg={5} className="mb-4 mb-lg-0">
            <AppointmentForm onSubmit={handleNewAppointment} />
          </Col>
          <Col lg={7}>
            <AppointmentList 
              appointments={appointments} 
              onUpdateStatus={handleUpdateStatus} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Rv;
