# Frontend - Application Angular

## Description
Interface web pour la gestion des produits développée avec Angular.

## Technologies
- **Angular 16**
- **Bootstrap 5**
- **TypeScript**

## Configuration
- **Port** : 4200
- **API Backend** : http://localhost:3333

## Installation et démarrage
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm start
```

L'application sera accessible sur http://localhost:4200

## Fonctionnalités
- ✅ **CRUD complet** des produits
- ✅ **Gestion des catégories**
- ✅ **Filtres avancés** :
  - Recherche par désignation
  - Filtrage par catégorie
  - Filtrage par produits en promotion
- ✅ **Interface responsive** avec Bootstrap
- ✅ **Validation des formulaires**
- ✅ **Auto-incrémentation des IDs**

## Structure
```
frontend/
├── src/app/
│   ├── model/              # Modèles TypeScript
│   ├── services/           # Services HTTP
│   ├── produits/           # Composant liste des produits
│   ├── ajout-produit/      # Composant ajout de produit
│   └── accueil/            # Composant d'accueil
├── angular.json
├── package.json
└── tsconfig.json
```