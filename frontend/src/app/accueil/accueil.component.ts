import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  
  // Statistiques pour la page d'accueil
  totalProduits: number = 0;
  totalCategories: number = 0;
  produitsEnPromotion: number = 0;
  
  // Données pour l'affichage
  produits: Produit[] = [];
  categories: Categorie[] = [];

  constructor(
    private produitsService: ProduitsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerStatistiques();
    this.chargerCategories();
  }

  /**
   * Charger les statistiques pour l'affichage
   */
  chargerStatistiques(): void {
    // Charger tous les produits pour calculer les statistiques
    this.produitsService.getProduits().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.totalProduits = produits.length;
        this.produitsEnPromotion = produits.filter(p => p.enPromotion).length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
        // Valeurs par défaut en cas d'erreur
        this.totalProduits = 0;
        this.produitsEnPromotion = 0;
      }
    });
  }

  /**
   * Charger les catégories pour l'affichage
   */
  chargerCategories(): void {
    this.produitsService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.totalCategories = categories.length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
        this.totalCategories = 0;
      }
    });
  }

  /**
   * Naviguer vers une catégorie spécifique
   */
  voirCategorie(categorieId: number | undefined): void {
    if (!categorieId) return;
    this.router.navigate(['/produits'], { 
      queryParams: { categorie: categorieId } 
    });
  }

  /**
   * Obtenir l'icône appropriée pour chaque catégorie
   */
  getCategoryIcon(code: string | undefined): string {
    if (!code) return 'bi-box-seam';
    
    const icons: { [key: string]: string } = {
      'INF': 'bi-laptop',
      'ELEC': 'bi-phone',
      'JOUET': 'bi-puzzle',
      'MAISON': 'bi-house',
      'SPORT': 'bi-bicycle',
      'LIVRE': 'bi-book',
      'MODE': 'bi-bag',
      'AUTO': 'bi-car-front'
    };
    return icons[code] || 'bi-box-seam';
  }

  /**
   * Calculer la valeur totale du stock
   */
  getValeurStock(): number {
    return this.produits.reduce((total, produit) => {
      const prix = produit.prix || 0;
      const quantite = produit.quantite || 0;
      return total + (prix * quantite);
    }, 0);
  }

  /**
   * Compter le nombre de produits par catégorie
   */
  getCategoryProductCount(categorieId: number | undefined): number {
    if (!categorieId) return 0;
    return this.produits.filter(p => p.categorie && p.categorie.id === categorieId).length;
  }
}
