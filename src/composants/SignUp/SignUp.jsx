import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './SignUp.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill all the fields.');
      return;
    }

    Axios.post('http://localhost:5000/auth/signup', {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="signup-page" style={{  backgroundColor: '#e2f8fe'}}>
      <motion.div
        className="wave"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-4 shadow-lg rounded-4 " style={{ minWidth: '350px' , marginBottom: '70px'}}>
            <h3 className="text-center mb-4">Sign Up</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Nom utilisateur</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaEnvelope className="me-2" /> Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaLock className="me-2" /> mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 rounded-pill">
                Inscription
              </Button>
            </Form>
            <p className="text-center mt-3">
              vous avez deja un compte? <Link to="/login">Connexion</Link>
            </p>
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

export default Signup;
