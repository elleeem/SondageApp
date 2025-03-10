# SondageApp
Application web de sondage réalisé en JavaScript (Nodejs), avec le framework Expressjs et une base de données Mongodb.

F O N C T I O N S :
Créer, consulter, répondre et gérer (modifier, supprimer) des sondages.

C O M M E N T  Ç A  M A R C H E ?

Un utilisateur doit au préalable créer un compte et se connecter grâce au système d'authentification JWT(Json Web Token).
Une fois connecté, il peut créer un sondage avec une ou plusieurs questions. Ces questions peuvent être des questions ouvertes ou à choix multiples.
Un utilisateur peut consulter tous les sondages. Seul le créateur d'un sondage peut le supprimer, le modifier ou modifier les questions et réponses prédéfinies.
NB: Un sondage doit être unique.

D É V E L O P P E M E N T

Pour développer cette application, je suis passée par plusieurs étapes.

Étape 1:
Création de la base, des collections et des documents dans MongoDB.

Étape 2 :
Mise en place de mon environnement.
=> Ce qui a consisté à installer  Nodejs et MongoDB (Compass) et les dépendances nécessaires telles que : 
- mongoose (pour intéragir avec mongodb),
- cros (pour gérer la connexion entre le backend et le frontend),
- jsonwebtoken (pour l'authentification des utilisateurs),
- express (pour la création du serveur web),
- dotenv (pour gérer les variables d'environnement) et
- bcryptjs (pour sécuriser les mot de passes)

Étape 3 : 
Configuration du serveur Express (par le fichier index.js) et de MongoDB (par .env).

Étape 4 :
Création du modèle et des routes (les URL qui vont permettre de créer, supprimer, consulter ou modifier un sondage) pour les sondages.

Étape 5 : 
Même démarche que l'étape 3 pour les utilisateurs + ajout de l'authentification JWT.
=>Tests avec Postman.

Étape 6 :
Même démarche que les étapes 3 et 4 pour les réponses aux sondages.  
=>Tests avec Postman.

Étape 6a :
Sécurisation des routes avec les middlewares.
=>Tests avec Postman.

Étape 7 :
Mise en place du frontend.
=> installation de React et axios (pour intéragir avec l'API)

Étape 8 : 
Création du dossier components avec ses différents fichiers notamment:
->SondagesList.js : pour afficher la liste des sondages.
->App.js : pour afficher les sondages dans la page principale.
