import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-gestion-produits';
  actions:Array<any>=[
    {titre:"Accueil",route:"/accueil" , icon:"bi bi-house-add-fill" },
    { titre: "Liste des produits", route: "/produits", icon: "bi bi-card-checklist" },
  { titre: "Ajouter Produit", route: "/ajouterProduit", icon: "bi bi-database-fill-add" }
  ]
 
  actionCourante:any;
  setActionCourante(a:any)
  {
    this.actionCourante=a;
  }
}
