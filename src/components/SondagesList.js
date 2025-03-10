    // src/components/SondagesList.js
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const SondagesList = () => {
    const [sondages, setSondages] = useState([]);
    const [reponses, setReponses] = useState({}); // Étape 1 : Ajouter un état pour les réponses

    useEffect(() => {
        axios.get('http://localhost:5000/api/sondages') // L'URL de ton backend
        .then(response => {
            setSondages(response.data); // Stocke les sondages dans le state
        })
        .catch(error => {
            console.error('Erreur lors du chargement des sondages', error);
        });
    }, []);

    // Fonction pour gérer les changements de réponse (pour les questions ouvertes et à choix multiples)
    const handleResponseChange = (questionId, value) => {
        setReponses(prevReponses => ({
        ...prevReponses,
        [questionId]: value,  // Met à jour la réponse pour cette question
        }));
    };

        // Fonction pour soumettre les réponses
    /*const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/sondages/repondre', {
                reponses,
                });
                alert("Réponses envoyées avec succès !");
                console.log("Réponses envoyées avec succès :", response.data);
            } catch (error) {
                console.error('Erreur lors de l\'envoi des réponses', error);
                alert("Erreur lors de l'envoi des réponses !");
            }
        };*/

    const handleSubmit  = async (sondageId, answers) => {
    try {
        const reponse = await axios.post(`/api/reponses/${sondageId}`, { answers });
        console.log(reponse.data);
    } catch (error) {
        console.error('Erreur lors de la soumission des réponses', error);
    }
    };

    return (
        <div>
        <h2>Liste des Sondages</h2>
        {sondages.length > 0 ? (
            <ul>
            {sondages.map(sondage => (
                <li key={sondage._id}>
                <h3>{sondage.titre}</h3>

                {/* Afficher les questions pour chaque sondage */}
                {sondage.questions && sondage.questions.length > 0 ? (
                    <ul>
                    {sondage.questions.map((texte, index) => (
                        <li key={index}>
                        <p><strong>Question : </strong>{texte.texte}</p> {/* Affichage de la question */}
                        
                        {/* Affichage des options si la question est de type "choix_multiple" */}
                        {texte.type === 'choix multiple' && (
                            <div>
                            <p><strong>Options :</strong></p>
                            {texte.options.map((option, i) => (
                                <div key={i}>
                                <label>
                                    <input
                                    type="radio"
                                    name={texte._id} // Assurer que chaque question a des options indépendantes
                                    value={option}
                                    checked={reponses[texte._id] === option} // Vérifie si cette option est la réponse sélectionnée
                                    onChange={() => handleResponseChange(texte._id, option)} // Met à jour l'état lorsque l'utilisateur sélectionne une option
                                    />
                                    {option}
                                </label>
                                </div>
                            ))}
                            </div>
                        )}

                        {/* Si la question est de type ouverte, afficher un champ texte */}
                        {texte.type === 'ouverte' && (
                            <input
                            type="text"
                            placeholder="Votre réponse ici"
                            value={reponses[texte._id] || ''} // Lier la valeur de l'input à l'état
                            onChange={(e) => handleResponseChange(texte._id, e.target.value)} // Mettre à jour l'état lors de la saisie
                            />
                        )}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>Aucune question disponible pour ce sondage.</p>
                )}
                </li>
            ))}
            </ul>
        ) : (
            <p>Aucun sondage disponible.</p>
            )}
            {/* Ajouter le bouton de soumission */}
      <button onClick={handleSubmit}>Envoyer mes réponses</button>
        </div>
        );
        
    };

    export default SondagesList;
