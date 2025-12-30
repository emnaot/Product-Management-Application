import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  urlHote = "http://localhost:3333/produits/";

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.urlHote);
  }

  // Récupérer un produit par ID
  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.urlHote + id);
  }

  // Ajouter un produit (sans ID - auto-généré)
  addProduit(produit: Produit): Observable<Produit> {
    // S'assurer que l'ID n'est pas envoyé et que les champs requis sont présents
    const produitSansId = { ...produit };
    delete produitSansId.id;
    
    // Validation des champs requis
    if (!produitSansId.code || !produitSansId.designation) {
      throw new Error('Code et désignation sont requis');
    }
    
    return this.http.post<Produit>(this.urlHote, produitSansId);
  }

  // Modifier un produit
  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.urlHote, produit);
  }

  // Supprimer un produit
  deleteProduit(produit: Produit): Observable<any> {
    return this.http.delete(this.urlHote, { body: produit });
  }

  // Supprimer un produit par ID (utilise l'endpoint GET pour la suppression)
  deleteProduitById(id: number): Observable<any> {
    return this.http.get(`${this.urlHote}delete/${id}`);
  }

  // Rechercher des produits par désignation
  rechercherProduits(designation: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlHote}search?designation=${designation}`);
  }

  // Récupérer les produits par catégorie
  getProduitsParCategorie(categorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlHote}categorie/${categorieId}`);
  }

  // Récupérer les produits en promotion
  getProduitsEnPromotion(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlHote}promotion`);
  }

  // Récupérer toutes les catégories
  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.urlHote}categories`);
  }

  // Ajouter une nouvelle catégorie
  ajouterCategorie(categorie: Categorie): Observable<Categorie> {
    const categorieSansId = { ...categorie };
    delete categorieSansId.id;
    
    // Validation des champs requis
    if (!categorieSansId.code || !categorieSansId.libelle) {
      throw new Error('Code et libellé sont requis pour la catégorie');
    }
    
    return this.http.post<Categorie>(`${this.urlHote}categories`, categorieSansId);
  }

  // Méthode existante pour compatibilité
  findByPrixGreaterThanOrderByPrixAsc(prixMin: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlHote}findByPrixGreaterThanOrderByPrixAsc?prixMin=${prixMin}`);
  }
}

