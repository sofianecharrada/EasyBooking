📘 EasyBooking – Système de Réservation de SallesEasyBooking est une application web moderne et robuste conçue pour simplifier la gestion et la réservation de salles de réunion. Le projet met l'accent sur la qualité logicielle, avec une architecture propre et une couverture de tests complète (Unitaires, Intégration, Sécurité et E2E).🚀 FonctionnalitésAuthentification sécurisée : Création de compte et connexion via JWT.Gestion des Salles : Consultation des salles avec filtres de capacité et équipements.Réservations intelligentes : Système anti-chevauchement (gestion des plages horaires de début et de fin).Tableau de bord utilisateur : Consultation et annulation des réservations personnelles.Interface d'administration : Création de nouvelles salles simplifiée.🧱 Architecture du ProjetLe projet est structuré en Monorepo pour faciliter la gestion du cycle de vie :PlaintextEasyBooking-main/
├── backend/                # API REST (Node.js / Express)
│   ├── src/                # Logique métier, modèles et contrôleurs
│   ├── tests/              # Tests Jest (Unit, Integration, Security)
│   └── server.js           # Point d'entrée du serveur
├── easybooking-frontend/   # Interface Utilisateur (Angular 17+)
│   ├── src/                # Composants et services
│   └── cypress/            # Tests End-to-End
└── README.md
🛠️ Installation et LancementPrérequisNode.js : v18 LTS ou supérieurMongoDB : Une instance locale ou un cluster MongoDB AtlasAngular CLI : Installé globalement (npm install -g @angular/cli)1. Configuration du BackendBashcd backend
npm install
Créez un fichier .env à la racine du dossier backend :Extrait de codePORT=3000
MONGO_URI=mongodb://localhost:27017/easybooking
JWT_SECRET=votre_secret_super_secure
Lancer le serveur :Bashnpm start
2. Configuration du FrontendBashcd ../easybooking-frontend
npm install
npm start
L'application sera disponible sur : http://localhost:4200🧪 Stratégie de TestsLe projet suit la pyramide des tests pour garantir une stabilité maximale.✅ Backend (Jest & Supertest)Type de TestCommandeDescriptionUnitairesnpm run test:unitValidation des modèles et middlewares isolés.Intégrationnpm run test:integrationTest des routes API réelles avec base de données de test.Sécuriténpm run test:securityVérification des injections SQL/NoSQL et des accès JWT.✅ Frontend (Cypress)Simule le parcours utilisateur complet dans un navigateur réel.Mode Interactif : npx cypress openMode Headless (CI) : npx cypress run🛠️ Technologies UtiliséesFrontend : Angular (Standalone Components), Bootstrap 5, Bootstrap Icons.Backend : Node.js, Express.js.Base de données : MongoDB via Mongoose.Sécurité : JSON Web Token (JWT), BcryptJS, CORS.Tests : Jest, Supertest, Cypress.🧠 Notes pour le DéploiementCORS : Le backend est configuré pour accepter les requêtes de localhost:4200. En production, mettez à jour la configuration CORS dans server.js.Base de données : Pour un déploiement distant, assurez-vous d'utiliser une URI MongoDB Atlas et de configurer l'IP d'accès.CI/CD : Le projet est prêt pour l'intégration continue via GitHub Actions ou GitLab CI.👨‍💻 AuteurSofiane - Développeur Fullstack
