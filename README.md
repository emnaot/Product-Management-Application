# Product Management Application

Full-stack product management application with Spring Boot backend and Angular frontend.

**Developed by: Emna Othmen**

## Architecture

```
product-management/
├── backend/           # Spring Boot REST API (Port 3333)
├── frontend/          # Angular Interface (Port 4200)
└── README.md         # This file
```

## Prerequisites
- **Java 17+**
- **Node.js 16+**
- **XAMPP with MySQL enabled**
- **Maven 3.6+** (included with mvnw)

## Quick Start

#### 1. Start XAMPP MySQL
1. Open **XAMPP Control Panel**
2. Click **"Start"** for **MySQL**
3. Verify MySQL is active (green button)

#### 2. Backend (Spring Boot)
```bash
cd backend
.\run-spring.bat
```
API available at http://localhost:3333

#### 3. Frontend (Angular)
```bash
cd frontend
.\start-frontend.bat
```
Interface available at http://localhost:4200

## Database Configuration

The application uses **XAMPP MySQL** with the following settings:
- **Server**: localhost:3306
- **Database**: gestion_produits (created automatically)
- **User**: root
- **Password**: (empty by default in XAMPP)

## Features

### Backend
- Complete REST API (CRUD)
- MySQL database via XAMPP
- Auto-incremented IDs
- Category management
- Filters and search
- Product promotions

### Frontend
- Responsive interface (Bootstrap)
- Forms without ID field
- Real-time filters
- Data validation
- Error/success messages

## Technologies

| Component | Technologies |
|-----------|-------------|
| **Backend** | Spring Boot 3.1.3, Spring Data JPA, MySQL, Maven |
| **Frontend** | Angular 16, Bootstrap 5, TypeScript |
| **Database** | MySQL 8+ via XAMPP |

## Demo Data

The application contains test data:
- **8 categories**: Informatique, Electronique, Jouets, etc.
- **17 products** distributed across categories
- **Products on promotion** to test filters

## Troubleshooting

### MySQL Issues
**Connection error:**
1. Verify XAMPP MySQL is started
2. Open XAMPP Control Panel
3. Click "Start" for MySQL
4. Restart the backend

### Port Issues
**Port 3333 or 4200 occupied:**
- Stop other applications on these ports
- Or modify ports in configuration

## API Endpoints

- `GET /produits/` - List all products
- `POST /produits/` - Add a product
- `PUT /produits/` - Update a product
- `DELETE /produits/delete/{id}` - Delete a product
- `GET /produits/categories` - List all categories
- `POST /produits/categories` - Add a category
- `GET /produits/search?designation=name` - Search products
- `GET /produits/categorie/{id}` - Products by category
- `GET /produits/promotion` - Products on promotion

## Project Structure

### Backend
```
backend/
├── src/main/java/soa/
│   ├── controller/          # REST Controllers
│   ├── entities/           # JPA Entities
│   ├── metier/             # Business Layer
│   ├── repository/         # JPA Repositories
│   └── SpringJpaApplication2.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

### Frontend
```
frontend/
├── src/app/
│   ├── model/              # TypeScript Models
│   ├── services/           # HTTP Services
│   ├── produits/           # Product List Component
│   ├── ajout-produit/      # Add Product Component
│   └── accueil/            # Home Component
├── angular.json
├── package.json
└── tsconfig.json
```

## Key Features Implemented

- Complete CRUD operations for products and categories
- Auto-incremented IDs (no manual ID input required)
- Real-time search by product name
- Category filtering
- Promotion filtering
- Responsive Bootstrap interface
- Form validation
- 100% dynamic data from MySQL database
**Professor**: M. Zayeni  
**Course**: Application Architectures  
**Year**: 2024-2025

## License

This project is for educational purposes.
