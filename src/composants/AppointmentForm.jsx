import  { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Calendar, Clock, FileText, User } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


const AppointmentForm = ({onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    service: '',
    date: '',
    time: '',
    reason: ''
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    
    try {
      const response = await axios.post("http://localhost:5000/appointment/appointments", formData);
      alert(response.data.message);
      
      // Si onSubmit est défini, on l'appelle avec les données du nouveau rendez-vous
      if (onSubmit) {
        onSubmit({...formData, status: 'en attente'});
      }
      
      // Réinitialiser le formulaire
      setFormData({
        patientName: '',
        doctorName: '',
        service: '',
        date: '',
        time: '',
        reason: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error);
      alert("Erreur lors de la création du rendez-vous");
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="appointment-form p-4 bg-white rounded shadow">
      <h2 className="mb-4 fw-bold">Nouveau Rendez-vous</h2>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-white">
            <User size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Nom du patient"
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-white">
            <User size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder="Nom du médecin"
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-white">
            <FileText size={18} />
          </InputGroup.Text>
          <Form.Select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un service</option>
            <option value="Cardiologie">Cardiologie</option>
            <option value="Pédiatrie">Pédiatrie</option>
            <option value="Dentaire">Dentaire</option>
            <option value="Ophtalmologie">Ophtalmologie</option>
            <option value="Dermatologie">Dermatologie</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-white">
            <Calendar size={18} />
          </InputGroup.Text>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-white">
            <Clock size={18} />
          </InputGroup.Text>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-4">
          <InputGroup.Text className="bg-white">
            <FileText size={18} />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Motif du rendez-vous"
            rows={3}
            required
          />
        </InputGroup>

        <Button variant="primary" type="submit" className="w-100 btn-create-appointment">
          Créer le rendez-vous
        </Button>
      </Form>
    </div>
  );
};

export default AppointmentForm;