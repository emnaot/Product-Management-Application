package soa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import soa.metier.ProduitMetierInterface;

@SpringBootApplication
public class SpringJpaApplication2 {
    //Déclaration d'un objet métier pour gérer les produits
    static ProduitMetierInterface produitMetier;

    public static void main(String[] args) {
        System.out.println("---------Demarrage du serveur REST----------");
        //Commencer par réaliser les injections de dépendances pour les objets de type Repository
        // référencer le contexte
        ApplicationContext contexte = SpringApplication.run(SpringJpaApplication2.class, args);
        // Récupérer une implémentation de l'interface "ProduitRepository" par injection de dépendance
        produitMetier = contexte.getBean(ProduitMetierInterface.class);

        System.out.println("Base de donnees initialisee et vide");
        System.out.println("Serveur REST demarre sur le port 3333");
        System.out.println("Application 100% dynamique - Toutes les donnees viennent de MySQL XAMPP");
        System.out.println("Endpoints disponibles :");
        System.out.println("- GET http://localhost:3333/produits/ (tous les produits)");
        System.out.println("- GET http://localhost:3333/produits/search?designation=nom (recherche)");
        System.out.println("- GET http://localhost:3333/produits/categorie/{id} (par categorie)");
        System.out.println("- GET http://localhost:3333/produits/promotion (produits en promotion)");
        System.out.println("- GET http://localhost:3333/produits/categories (toutes les categories)");
        System.out.println("- POST http://localhost:3333/produits/ (ajouter produit)");
        System.out.println("- POST http://localhost:3333/produits/categories (ajouter categorie)");
        System.out.println("- PUT http://localhost:3333/produits/ (modifier produit)");
        System.out.println("- DELETE http://localhost:3333/produits/delete/{id} (supprimer produit)");
    }
}
