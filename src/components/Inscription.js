// src/components/Inscription.js
import React, { useState } from 'react';
import axios from 'axios';

const Inscription = ({ history }) => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/inscription', { pseudo, email, password });
      history.push('/connexion');
    } catch (error) {
      console.error('Erreur d\'inscription', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input type="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Pseudo" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Inscription;
