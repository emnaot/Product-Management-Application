import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/Categorie'; 

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  urlHote = "http://localhost:3333/produits/categories"; // Utilise l'endpoint du contrôleur produits

  constructor(private http: HttpClient) { }

  // Récupérer toutes les catégories
  getCategories(): Observable<Array<Categorie>> { 
    return this.http.get<Array<Categorie>>(this.urlHote);
  }

  // Ajouter une nouvelle catégorie
  ajouterCategorie(categorie: Categorie): Observable<Categorie> {
    const categorieSansId = { ...categorie };
    delete categorieSansId.id;
    return this.http.post<Categorie>(this.urlHote, categorieSansId);
  }
}