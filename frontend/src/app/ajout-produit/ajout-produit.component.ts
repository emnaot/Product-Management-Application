import { Component } from '@angular/core';
import { Produit } from '../model/Produit';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';
import { CategoriesService } from '../services/categorie.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css'],
})
export class AjoutProduitComponent {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  nouveauProduit: Produit = new Produit();
  nouvelleCategorie: Categorie = new Categorie(); // Pour ajouter des catégories
  selectedCategoryId: number | undefined; 
  erreur: string | null = null;

  constructor(
    private produitsService: ProduitsService, 
    private categoriesService: CategoriesService
  ) {
    // Initialiser la date d'achat avec la date du jour
    const today = new Date();
    this.nouveauProduit.dateAchat = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.fetchProduits();
    this.fetchCategories();
  }

  // Récupérer la liste des produits
  fetchProduits() {
    console.log('Récupérer la liste des produits');
    this.produitsService.getProduits().subscribe({
      next: (data) => {
        console.log('Succès GET produits');
        this.produits = data;
      },
      error: (err) => {
        console.log('Erreur GET produits', err);
      },
    });
  }

  // Récupérer la liste des catégories
  fetchCategories() {
    console.log('Récupérer la liste des catégories');
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('Succès GET catégories');
        this.categories = data;
      },
      error: (err) => {
        console.log('Erreur GET catégories', err);
      },
    });
  }

  // Valider le formulaire de produit (sans vérification d'ID car auto-généré)
  validerFormulaire() {
    // Associer la catégorie sélectionnée
    if (this.selectedCategoryId) {
      const categorie = this.categories.find(c => c.id == this.selectedCategoryId);
      this.nouveauProduit.categorie = categorie;
    } else {
      this.nouveauProduit.categorie = undefined;
    }

    this.ajouterProduit();
  }

  // Ajouter un nouveau produit (sans ID - auto-généré)
  ajouterProduit() {
    // Validation côté client
    if (!this.nouveauProduit.code || !this.nouveauProduit.designation) {
      alert('Veuillez remplir tous les champs obligatoires (Code et Désignation)');
      return;
    }

    console.log('Ajout du produit:', this.nouveauProduit);
    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: (produitAjoute) => {
        console.log('Succès ajout de produit', produitAjoute);
        alert('Produit ajouté avec succès !');
        this.effacer(); // Réinitialiser le formulaire
        this.fetchProduits(); // Recharger la liste
      },
      error: (err) => {
        console.log('Erreur ajout de produit', err);
        alert('Erreur lors de l\'ajout du produit: ' + (err.message || 'Erreur inconnue'));
      },
    });
  }

  // Ajouter une nouvelle catégorie
  ajouterCategorie() {
    // Validation côté client
    if (!this.nouvelleCategorie.code || !this.nouvelleCategorie.libelle) {
      alert('Veuillez remplir tous les champs de la catégorie (Code et Libellé)');
      return;
    }

    console.log('Ajout de la catégorie:', this.nouvelleCategorie);
    this.categoriesService.ajouterCategorie(this.nouvelleCategorie).subscribe({
      next: (categorieAjoutee) => {
        console.log('Succès ajout de catégorie', categorieAjoutee);
        alert('Catégorie ajoutée avec succès !');
        this.categories.push(categorieAjoutee); // Ajouter à la liste locale
        this.nouvelleCategorie = new Categorie(); // Réinitialiser
      },
      error: (err) => {
        console.log('Erreur ajout de catégorie', err);
        alert('Erreur lors de l\'ajout de la catégorie: ' + (err.message || 'Erreur inconnue'));
      },
    });
  }

  // Effacer le formulaire
  effacer() {
    this.nouveauProduit = new Produit();
    const today = new Date();
    this.nouveauProduit.dateAchat = today.toISOString().split('T')[0]; // Réinitialiser avec la date du jour
    this.selectedCategoryId = undefined;
  }
}
