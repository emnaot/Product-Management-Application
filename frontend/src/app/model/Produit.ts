import { Categorie } from "./Categorie";

export class Produit {
    id?: number; // Optionnel car auto-généré côté serveur
    code: string | undefined;
    designation: string | undefined;
    prix: number | undefined;
    quantite: number | undefined; // Ajout du champ quantité
    dateAchat: string | undefined; // Ajout du champ date d'achat
    enPromotion: boolean = false; // Ajout du champ promotion
    categorieId: number | undefined; 
    categorie: Categorie | undefined;
}
  