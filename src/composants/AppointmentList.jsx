
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import axios from 'axios';

import { toast } from 'sonner';

const AppointmentList = ({ appointments, onUpdateStatus }) => {
  if (!Array.isArray(appointments) || appointments.length === 0) {
    return (
      <div className="appointment-list p-4 bg-white rounded shadow">
        <h2 className="mb-4 fw-bold">Liste des Rendez-vous</h2>
        <p className="text-muted">Aucun rendez-vous programmé</p>
      </div>
    );
  }
  
  const getStatusBadge = (status) => {
    if (status === 'confirmé' || status === 'Confirmé') {
      return <Badge bg="success" className="status-badge">Confirmé</Badge>;
    } else if (status === 'annulé' || status === 'Annulé') {
      return <Badge bg="danger" className="status-badge">Annulé</Badge>;
    } else {
      return <Badge bg="warning" className="status-badge">En attente</Badge>;
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

  const handleConfirm = async (id) => {
    try {
      // Envoyer une requête au backend pour mettre à jour le statut
      await axios.put(`http://localhost:5000/appointment/appointments/${id}`, { status: 'confirmé' });
      
      // Mettre à jour localement
      if (onUpdateStatus) {
        onUpdateStatus(id, 'confirmé');
      }
      
      // Afficher une notification de succès
      toast.success("Rendez-vous confirmé avec succès");
    } catch (error) {
      console.error("Erreur lors de la confirmation du rendez-vous:", error);
      toast.error("Erreur lors de la confirmation du rendez-vous");
    }
  };

  const handleCancel = async (id) => {
    try {
      // Envoyer une requête au backend pour mettre à jour le statut
      await axios.put(`http://localhost:5000/appointment/appointments/${id}`, { status: 'annulé' });
      
      // Mettre à jour localement
      if (onUpdateStatus) {
        onUpdateStatus(id, 'annulé');
      }
      
      // Afficher une notification de succès
      toast.success("Rendez-vous annulé avec succès");
    } catch (error) {
      console.error("Erreur lors de l'annulation du rendez-vous:", error);
      toast.error("Erreur lors de l'annulation du rendez-vous");
    }
  };

  return (
    <div className="appointment-list p-4 bg-white rounded shadow">
      <h2 className="mb-4 fw-bold">Liste des Rendez-vous</h2>
      
      {appointments.map((appointment, index) => (
        <Card key={appointment._id || index} className="mb-3 appointment-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-1">{appointment.patientName}</h5>
                {getStatusBadge(appointment.status || 'en attente')}
              </div>
            </div>
            
            <Row className="appointment-details mt-2">
              <Col xs={12} md={6} className="mb-2">
                <div className="d-flex align-items-center">
                  <User size={16} className="me-2 text-muted" />
                  <span>{appointment.doctorName}</span>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-2">
                <div className="d-flex align-items-center">
                  <FileText size={16} className="me-2 text-muted" />
                  <span>{appointment.service}</span>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-2">
                <div className="d-flex align-items-center">
                  <Calendar size={16} className="me-2 text-muted" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-2">
                <div className="d-flex align-items-center">
                  <Clock size={16} className="me-2 text-muted" />
                  <span>{appointment.time}</span>
                </div>
              </Col>
            </Row>

            {(appointment.status !== 'confirmé' && appointment.status !== 'Confirmé' &&
             appointment.status !== 'annulé' && appointment.status !== 'Annulé') && (
              <div className="d-flex gap-2 mt-3">
                <Button 
                  variant="success" 
                  className="flex-grow-1"
                  onClick={() => handleConfirm(appointment._id)}
                >
                  Confirmer
                </Button>
                <Button 
                  variant="danger" 
                  className="flex-grow-1"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Annuler
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentList;
