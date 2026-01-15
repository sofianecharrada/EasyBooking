# 📘 EasyBooking – Système de Réservation de Salles

**EasyBooking** est une application web full-stack permettant de gérer et réserver des salles de réunion. Le projet met l'accent sur la **qualité logicielle**, avec une architecture robuste et une couverture de tests automatisés complète.

---

## 🚀 Fonctionnalités
* **Authentification sécurisée** : Création de compte et connexion via JWT.
* **Gestion des Salles** : Consultation des salles avec filtres de capacité.
* **Réservations par plage horaire** : Système anti-chevauchement (Heure de début / Heure de fin).
* **Tableau de bord** : Consultation et annulation des réservations personnelles.
* **Administration** : Interface dédiée pour l'ajout de nouvelles salles.

---

## 🧱 Architecture du Projet



```text
EasyBooking-main/
├── backend/                # API REST (Node.js / Express)
│   ├── src/                # Logique métier (Modèles, Contrôleurs, Routes)
│   ├── tests/              # Jest (Unitaires, Intégration, Sécurité)
│   └── server.js           # Point d'entrée du serveur
├── easybooking-frontend/   # Interface Utilisateur (Angular)
│   ├── src/                # Composants, Services et Guards
│   └── cypress/            # Tests End-to-End (E2E)
└── README.md
```
# 📘 EasyBooking – Application de Réservation de Salles

**EasyBooking** est une solution complète permettant de gérer des réservations de salles avec une approche axée sur la qualité logicielle et la sécurité.

---

## ✅ Prérequis

Avant de commencer, assurez-vous d’avoir installé :
* **Node.js 18 LTS** ou supérieur
* **npm** (inclus avec Node.js)
* **MongoDB** (Local ou via un cluster [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

**Vérification des versions :**
```bash
node -v
npm -v
```
🚀 Installation et lancement du BACKEND (API)
📍 Dossier : backend

1️⃣ Installation des dépendances
cd backend

npm install

👉 Installe Express, Mongoose, Jest, Supertest, etc.

2️⃣ Configuration de l’environnement
Créez ou vérifiez le fichier .env à la racine du dossier backend avec ces variables :

PORT=3000 MONGO_URI=mongodb://localhost:27017/easybooking JWT_SECRET=secret

3️⃣ Lancer le serveur backend
npm start

Résultat attendu :

Serveur EasyBooking lancé sur le port 3000

Connecté à MongoDB

L’API est disponible sur : http://localhost:3000

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

L’application est accessible sur : http://localhost:4200

🧪 Tests Automatisés
Le projet suit une stratégie de test rigoureuse pour garantir la stabilité et la sécurité.

🔹 Tests Backend (Jest)
À exécuter dans le dossier /backend :

Tests unitaires : npm run test:unit

👉 Vérifie les modèles, middlewares et règles métiers isolées.

Tests d’intégration : npm run test:integration

👉 Teste les routes API complètes avec Supertest.

Tests de sécurité : npm run test:security

👉 Vérifie les accès non autorisés, les tentatives d’injection et la robustesse de l’API.

🔹 Tests End-to-End (Cypress)
À exécuter dans le dossier /easybooking-frontend :

Mode interactif (démo) :

npx cypress open

(Choisir E2E Testing > Chrome > Fichier easybooking.e2e.cy.js)

Mode automatique (CI) :

npx cypress run

👉 Simule le parcours réel d’un utilisateur (connexion, navigation, réservation).

🔁 Automatisation des tests (CI/CD)
Tous les tests du projet sont :

Scriptés et versionnés dans Git.

Exécutables automatiquement via une seule commande.

Conçus pour être intégrés dans une chaîne CI (GitHub Actions, GitLab CI) à chaque push ou pull request.

🧠 Notes importantes
Tolérance d'erreurs : Les erreurs backend sont volontairement tolérées en mode E2E pour ne pas bloquer les tests de l'interface utilisateur.

Réalisme : Le projet privilégie une approche pragmatique de la qualité logicielle pour refléter des conditions réelles de production.

👨‍💻 Auteur
Sofiane – Développeur Fullstack

Certaines failles de sécurité sont volontairement détectées et documentées.

Le projet privilégie une approche réaliste de la qualité logicielle.
