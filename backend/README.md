# Backend - API REST Spring Boot

## Description
API REST pour la gestion des produits et catégories développée avec Spring Boot.

## Technologies
- **Spring Boot 3.1.3**
- **Spring Data JPA**
- **MySQL via XAMPP**
- **Maven**

## Prérequis
- **Java 17+**
- **XAMPP** avec MySQL activé
- **Maven** (inclus avec mvnw)

## Configuration Base de Données
- **XAMPP MySQL** : localhost:3306
- **Base de données** : gestion_produits (créée automatiquement)
- **Utilisateur** : root (sans mot de passe par défaut XAMPP)

## Démarrage

### 1. Démarrer XAMPP MySQL
1. Ouvrir **XAMPP Control Panel**
2. Cliquer sur **"Start"** pour **MySQL**
3. Vérifier que MySQL est bien démarré (bouton vert)

### 2. Démarrer le Backend
```bash
# Windows
.\run-spring.bat

# Ou avec Maven
.\mvnw spring-boot:run
```

### 3. Démarrage automatique complet
```bash
# Démarre XAMPP + Backend + Frontend automatiquement
.\start-all-with-xampp.bat
```

## Vérification
- API disponible sur http://localhost:3333
- Test: http://localhost:3333/produits/
- Base de données créée automatiquement au premier démarrage

## Endpoints principaux
- `GET /produits/` - Liste tous les produits
- `POST /produits/` - Ajouter un produit
- `PUT /produits/` - Modifier un produit
- `DELETE /produits/delete/{id}` - Supprimer un produit
- `GET /produits/categories` - Liste toutes les catégories
- `POST /produits/categories` - Ajouter une catégorie
- `GET /produits/search?designation=nom` - Rechercher des produits
- `GET /produits/categorie/{id}` - Produits par catégorie
- `GET /produits/promotion` - Produits en promotion

## Dépannage
**Erreur de connexion MySQL :**
1. Vérifier que XAMPP MySQL est démarré
2. Ouvrir XAMPP Control Panel
3. Cliquer sur "Start" pour MySQL
4. Redémarrer le backend

**Port 3306 occupé :**
- Arrêter les autres services MySQL
- Ou changer le port dans XAMPP

## Structure
```
backend/
├── src/main/java/soa/
│   ├── controller/          # Contrôleurs REST
│   ├── entities/           # Entités JPA
│   ├── metier/             # Couche métier
│   ├── repository/         # Repositories JPA
│   └── SpringJpaApplication2.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```