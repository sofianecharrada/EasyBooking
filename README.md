📘 EasyBooking – Application de réservation de salles

EasyBooking est une application web permettant aux utilisateurs de :

créer un compte

se connecter

consulter des salles disponibles

réserver une salle pour un créneau horaire

consulter leurs réservations

Le projet est composé :

d’un backend (Node.js / Express / MongoDB)

d’un frontend (Angular)

d’une suite complète de tests automatisés

🧱 Architecture du projet
EasyBooking-main/
├── backend/                 → API (Node.js / Express)
│   ├── src/                 → Code applicatif
│   ├── tests/               → Tests unitaires, intégration, sécurité
│   └── server.js
│
├── easybooking-frontend/    → Frontend Angular
│   ├── src/                 → Interface utilisateur
│   └── cypress/             → Tests End-to-End (Cypress)
│
└── README.md

✅ Prérequis

Avant de commencer, assurez-vous d’avoir :

Node.js 18 LTS

npm (fourni avec Node.js)

MongoDB (local ou distant via MongoDB Atlas)

Vérification :

node -v
npm -v

🚀 Installation et lancement du BACKEND (API)

📍 Dossier : backend

1️⃣ Installation des dépendances
cd backend
npm install


👉 Installe Express, Mongoose, Jest, Supertest, etc.

2️⃣ Configuration de l’environnement

Créer ou vérifier le fichier .env :

PORT=3000
MONGO_URI=mongodb://localhost:27017/easybooking
JWT_SECRET=secret

3️⃣ Lancer le serveur backend
npm start


Résultat attendu :

Serveur EasyBooking lancé sur le port 3000
Connecté à MongoDB


L’API est disponible sur :

http://localhost:3000

🎨 Installation et lancement du FRONTEND (Angular)

📍 Dossier : easybooking-frontend

1️⃣ Installation des dépendances
cd easybooking-frontend
npm install


👉 Installe Angular, Cypress et les dépendances UI.

2️⃣ Lancer l’application frontend
npm start


Résultat attendu :

Local: http://localhost:4200


L’application est accessible sur :

http://localhost:4200

🧪 Tests automatisés
🔹 Tests unitaires (Jest)

📍 backend

npm run test:unit


👉 Vérifie les modèles, middlewares et règles métiers isolées.

🔹 Tests d’intégration (API)
npm run test:integration


👉 Teste les routes API complètes avec Supertest.

🔹 Tests de sécurité
npm run test:security


👉 Vérifie :

accès non autorisés

tentatives d’injection

exposition d’erreurs internes

robustesse de l’API

🔹 Tests End-to-End (Cypress)

📍 easybooking-frontend

Mode interactif (démo)
npx cypress open


Puis :

E2E Testing

Chrome

Fichier easybooking.e2e.cy.js

Mode automatique (CI)
npx cypress run


👉 Simule le parcours réel d’un utilisateur (connexion, navigation, réservation).

🔁 Automatisation des tests (CI/CD)

Tous les tests sont :

scriptés

versionnés dans Git

exécutables automatiquement

Ils peuvent être intégrés dans une chaîne CI (GitHub Actions, GitLab CI) à chaque push ou pull request.

🧠 Notes importantes

Les erreurs backend sont volontairement tolérées en E2E pour ne pas bloquer les tests front.

Certaines failles de sécurité sont volontairement détectées et documentées.

Le projet privilégie une approche réaliste de la qualité logicielle.