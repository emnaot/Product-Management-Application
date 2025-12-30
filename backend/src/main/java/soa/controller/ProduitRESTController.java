package soa.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import soa.entities.Categorie;
import soa.entities.Produit;
import soa.repository.CategorieRepository;
import soa.repository.ProduitRepository;

@RestController // pour déclarer un service web de type REST
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/produits")  //    http://localhost:3333/produits
public class ProduitRESTController {
    @Autowired // pour l'injection de dépendances
    private ProduitRepository produitRepos;
    
    @Autowired // pour l'injection de dépendances des catégories
    private CategorieRepository categorieRepos;

    //  Message d'accueil
    //  http://localhost:3333/produits/index  (GET)
    @GetMapping(value ="/index" )
    public String accueil() {
        return "BienVenue au service Web REST 'produits' sur le port 3333.....";
    }

    //  Afficher la liste des produits
    //  http://localhost:3333/produits/ (GET)
    @GetMapping(
            // spécifier le path de la méthode
            value= "/",
            // spécifier le format de retour en XML
            produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }
    )
    public  List<Produit> getAllProduits() {
        return produitRepos.findAll();
    }

    //  Afficher la liste des produits avec filtre par désignation
    //  http://localhost:3333/produits/search?designation=nom (GET)
    @GetMapping(
            value= "/search",
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public List<Produit> rechercherProduitsParDesignation(@RequestParam String designation) {
        return produitRepos.findAll().stream()
                .filter(p -> p.getDesignation().toLowerCase().contains(designation.toLowerCase()))
                .collect(Collectors.toList());
    }

    //  Afficher la liste des produits par catégorie
    //  http://localhost:3333/produits/categorie/{categorieId} (GET)
    @GetMapping(
            value= "/categorie/{categorieId}",
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public List<Produit> getProduitsParCategorie(@PathVariable Long categorieId) {
        return produitRepos.findAll().stream()
                .filter(p -> p.getCategorie() != null && p.getCategorie().getId().equals(categorieId))
                .collect(Collectors.toList());
    }

    //  Afficher la liste des produits en promotion
    //  http://localhost:3333/produits/promotion (GET)
    @GetMapping(
            value= "/promotion",
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public List<Produit> getProduitsEnPromotion() {
        return produitRepos.findAll().stream()
                .filter(Produit::isEnPromotion)
                .collect(Collectors.toList());
    }

    //  Afficher un produit en spécifiant son 'id'
    //  http://localhost:3333/produits/{id} (GET)
    @GetMapping(
            // spécifier le path de la méthode qui englobe un paramètre
            value= "/{id}" ,
            // spécifier le format de retour en XML
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public Produit getProduit(@PathVariable Long id) {
        Produit p =produitRepos.findById(id).get();
        return p;
    }

    // Supprimer un produit par 'id' avec la méthode 'GET'
    //  http://localhost:3333/produits/delete/{id}  (GET)
    @GetMapping(
            // spécifier le path de la méthode
            value = "/delete/{id}")
    public void deleteProduit(@PathVariable Long id)
    {
        produitRepos.deleteById(id);
    }

    //  ajouter un produit avec la méthode "POST" (sans ID - auto-incrémenté)
    //  http://localhost:3333/produits/   (POST)
    @PostMapping(
            // spécifier le path de la méthode
            value = "/"  ,
            //spécifier le format de retour
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public Produit saveProduit(@RequestBody Produit p)
    {
        // L'ID sera auto-généré, on ne le définit pas manuellement
        p.setId(null);
        return produitRepos.save(p);
    }

    //  modifier un produit avec la méthode "PUT"
    //  http://localhost:3333/produits/   (PUT)
    @PutMapping(
            // spécifier le path de la méthode
            value = "/"  ,
            //spécifier le format de retour
            produces = { MediaType.APPLICATION_JSON_VALUE  }
    )
    public Produit updateProduit(@RequestBody Produit p)
    {
        return produitRepos.save(p);
    }

    // Supprimer un produit  avec la méthode 'DELETE'
    //  http://localhost:3333/produits/   (DELETE)
    @DeleteMapping(
            // spécifier le path de la méthode
            value = "/")
    public void deleteProduit(@RequestBody Produit p)
    {
        produitRepos.delete(p);
    }

    // ===== ENDPOINTS POUR LES CATÉGORIES =====
    
    //  Afficher la liste des catégories
    //  http://localhost:3333/produits/categories (GET)
    @GetMapping(
            value= "/categories",
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public List<Categorie> getAllCategories() {
        return categorieRepos.findAll();
    }

    //  Ajouter une nouvelle catégorie
    //  http://localhost:3333/produits/categories (POST)
    @PostMapping(
            value = "/categories",
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    public Categorie saveCategorie(@RequestBody Categorie c) {
        // L'ID sera auto-généré
        c.setId(null);
        return categorieRepos.save(c);
    }
}
