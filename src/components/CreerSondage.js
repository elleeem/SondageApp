// src/components/CreerSondage.js
import React, { useState } from 'react';
import axios from 'axios';

const CreerSondage = () => {
  const [titre, setTitre] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [sondageCreated, setSondageCreated] = useState(false);

  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/sondages',
        {
          titre,
          questions: [
            {
              question,
              type: 'choix_multiple',
              options,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSondageCreated(true);
    } catch (error) {
      console.error('Erreur lors de la création du sondage', error);
    }
  };

  return (
    <div>
      <h2>Créer un sondage</h2>
      <input
        type="text"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        placeholder="Titre du sondage"
      />
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
      />
      <input
        type="text"
        value={options.join(', ')}
        onChange={(e) => setOptions(e.target.value.split(', '))}
        placeholder="Options (séparées par des virgules)"
      />
      <button onClick={handleCreate}>Créer le sondage</button>
      {sondageCreated && <p>Sondage créé avec succès !</p>}
    </div>
  );
};

export default CreerSondage;
