# 📘 EasyBooking – Système de Réservation de Salles

**EasyBooking** est une application web moderne permettant de gérer et réserver des salles de réunion. Le projet met l'accent sur la **qualité logicielle**, avec une architecture propre et une couverture de tests complète.



---

## 🚀 Fonctionnalités
* **Authentification sécurisée** : Création de compte et connexion via JWT.
* **Gestion des Salles** : Consultation avec filtres de capacité et équipements.
* **Réservations par plage horaire** : Système anti-chevauchement (Heure de début / Heure de fin).
* **Tableau de bord** : Consultation et annulation des réservations personnelles.

---

## 🧱 Architecture du Projet

```text
EasyBooking-main/
├── backend/                # API REST (Node.js / Express)
│   ├── src/                # Logique métier (Modèles, Contrôleurs)
│   ├── tests/              # Jest (Unit, Integration, Security)
│   └── server.js           # Point d'entrée
├── easybooking-frontend/   # Interface Utilisateur (Angular)
│   ├── src/                # Composants et Services
│   └── cypress/            # Tests End-to-End
└── README.md

🛠️ Installation et Lancement
1. Configuration du Backend
Aller dans le dossier : cd backend

Installer les dépendances : npm install

Créer un fichier .env avec :

Extrait de code

PORT=3000
MONGO_URI=mongodb://localhost:27017/easybooking
JWT_SECRET=secret_key
Lancer : npm start

2. Configuration du Frontend
Aller dans le dossier : cd easybooking-frontend

Installer les dépendances : npm install

Lancer : npm start

Accéder à l'app : http://localhost:4200

🧪 Stratégie de Tests
✅ Backend (Jest)
Unitaires : npm run test:unit

Intégration : npm run test:integration

Sécurité : npm run test:security

✅ Frontend (Cypress)
Mode Interactif : npx cypress open

Mode Automatique : npx cypress run

🧠 Notes Techniques
CORS : Configuré pour autoriser localhost:4200.

Base de données : MongoDB (Local ou Atlas).

Validation : Logique de collision d'horaires implémentée côté serveur.

👨‍💻 Auteur
Sofiane - Développeur Fullstack
