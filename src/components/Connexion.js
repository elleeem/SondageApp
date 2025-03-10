// src/components/Connexion.js
import React, { useState } from 'react';
import axios from 'axios';

const Connexion = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/connexion', { email, password });
      localStorage.setItem('token', response.data.token); // Sauvegarder le token dans localStorage
      history.push('/sondages');
    } catch (error) {
      console.error('Erreur de connexion', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Connexion;
