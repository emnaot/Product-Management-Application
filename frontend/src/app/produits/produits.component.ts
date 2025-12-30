import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/Produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categorie.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  produitCourant: Produit = new Produit();
  selectedCategory: Categorie | undefined;
  erreur: string | undefined;
  editMode: boolean = false;
  
  // Filtres
  searchTerm: string = '';
  filtreCategorieId: number | string = '';
  filtrePromotion: boolean = false;
  filteredProduits: Produit[] = [];

  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
  }

  // Récupérer tous les produits
  getProduits(): void {
    this.produitsService.getProduits().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.filteredProduits = [...produits]; // Initialisation des produits filtrés
        console.log('Produits chargés:', produits);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.erreur = 'Erreur lors du chargement des produits';
      }
    });
  }

  // Récupérer toutes les catégories
  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Catégories chargées:', categories);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    });
  }

  // Valider le formulaire de modification
  validerFormulaire(form: NgForm): void {
    if (this.editMode) {
      const reponse: boolean = confirm(
        "Confirmez-vous la mise à jour du produit : " +
          (this.produitCourant.designation || 'Sans nom') + ' ?'
      );
      if (reponse) {
        if (this.selectedCategory) {
          this.produitCourant.categorie = this.selectedCategory;
        } else {
          this.produitCourant.categorie = undefined;
        }

        this.produitsService.updateProduit(this.produitCourant).subscribe({
          next: (updatedProduit) => {
            console.log('Produit mis à jour avec succès');
            // Mettre à jour localement
            const index = this.produits.findIndex(p => p.id === updatedProduit.id);
            if (index !== -1) {
              this.produits[index] = updatedProduit;
              this.appliquerFiltres(); // Réappliquer les filtres
            }
            this.reset();
            alert('Produit modifié avec succès !');
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour', error);
            this.erreur = 'Erreur lors de la mise à jour du produit';
          }
        });
      }
    }
  }

  // Éditer un produit
  editerProduit(p: Produit) {
    console.log('Édition du produit:', p);
    this.produitCourant = { ...p };
    this.selectedCategory = p.categorie;
    this.editMode = true;
  }

  // Annuler l'édition
  annulerEdition(): void {
    this.reset();
  }

  // Réinitialiser le formulaire
  private reset(): void {
    this.editMode = false;
    this.produitCourant = new Produit();
    this.erreur = undefined;
    this.selectedCategory = undefined;
  }

  // Supprimer un produit
  supprimerProduit(p: Produit) {
    let reponse: boolean = confirm(
      'Voulez-vous supprimer le produit : ' + (p.designation || 'Sans nom') + ' ?'
    );
    if (reponse) {
      console.log('Suppression confirmée...');
      if (p.id) {
        this.produitsService.deleteProduitById(p.id).subscribe({
          next: () => {
            console.log('Succès DELETE');
            let index: number = this.produits.indexOf(p);
            if (index !== -1) {
              this.produits.splice(index, 1);
              this.appliquerFiltres(); // Réappliquer les filtres
            }
            alert('Produit supprimé avec succès !');
          },
          error: (err) => {
            console.log('Erreur DELETE', err);
            alert('Erreur lors de la suppression du produit');
          },
        });
      } else {
        alert('Impossible de supprimer : ID du produit manquant');
      }
    }
  }

  // === MÉTHODES DE FILTRAGE ===

  // Filtrer par terme de recherche (désignation)
  onSearchTermChange(): void {
    if (this.searchTerm.trim() !== '') {
      this.produitsService.rechercherProduits(this.searchTerm).subscribe({
        next: (produits) => {
          this.filteredProduits = produits;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche', error);
          // En cas d'erreur, filtrer localement
          this.filtrerLocalement();
        }
      });
    } else {
      this.appliquerFiltres();
    }
  }

  // Filtrer par catégorie
  filtrerParCategorie(): void {
    if (this.filtreCategorieId) {
      this.produitsService.getProduitsParCategorie(+this.filtreCategorieId).subscribe({
        next: (produits) => {
          this.filteredProduits = produits;
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par catégorie', error);
          this.filtrerLocalement();
        }
      });
    } else {
      this.appliquerFiltres();
    }
  }

  // Filtrer par promotion
  filtrerPromotion(): void {
    if (this.filtrePromotion) {
      this.produitsService.getProduitsEnPromotion().subscribe({
        next: (produits) => {
          this.filteredProduits = produits;
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par promotion', error);
          this.filtrerLocalement();
        }
      });
    } else {
      this.appliquerFiltres();
    }
  }

  // Réinitialiser tous les filtres
  reinitialiserFiltres(): void {
    this.searchTerm = '';
    this.filtreCategorieId = '';
    this.filtrePromotion = false;
    this.filteredProduits = [...this.produits];
  }

  // Appliquer les filtres (utilisé quand aucun filtre spécifique n'est actif)
  private appliquerFiltres(): void {
    if (!this.searchTerm && !this.filtreCategorieId && !this.filtrePromotion) {
      this.filteredProduits = [...this.produits];
    } else {
      this.filtrerLocalement();
    }
  }

  // Filtrage local (fallback en cas d'erreur API)
  private filtrerLocalement(): void {
    this.filteredProduits = this.produits.filter(produit => {
      let passeTous = true;

      // Filtre par désignation
      if (this.searchTerm.trim()) {
        passeTous = passeTous && (produit.designation?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
      }

      // Filtre par catégorie
      if (this.filtreCategorieId) {
        passeTous = passeTous && (produit.categorie?.id == this.filtreCategorieId);
      }

      // Filtre par promotion
      if (this.filtrePromotion) {
        passeTous = passeTous && (produit.enPromotion === true);
      }

      return passeTous;
    });
  }
}
