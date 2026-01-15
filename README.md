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
