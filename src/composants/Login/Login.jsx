import { useState } from "react";

import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";

import { FaUser, FaLock } from "react-icons/fa"; // Icônes utilisateur et mot de passe
import { motion } from "framer-motion"; // Ajout


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Utilisez email et password directement ici
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Redirigez vers une autre page après la connexion réussie
        navigate('/rv'); // Remplacez '/dashboard' par la page souhaitée
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#e2f8fe",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "150px", // espace pour vague
      }}
    >
      <Container>
      <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <Card
    style={{
      maxWidth: "460px",
      margin: "0 auto",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    }}
  >
          <h3 className="text-center mb-4">Connexion</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Se connecter
              </Button>
              
       
        <p> Pas encore inscrit? <Link to="/signup">Inscription</Link></p>
            </div>
          </Form>
        </Card>
        </motion.div>
      </Container>

      {/* Bande vague en bas */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "200px", width: "100%" }}
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.38,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#007bff" }}
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Login;
