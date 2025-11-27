import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre';
import { SearchFilterPipe } from '../search-filter-pipe';
import { Theme } from '../model/theme.model';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {

  livres!: Livre[];
  allLivres!: Livre[];
  searchTerm: string = "";

  constructor(private livreService: LivreService) {}

  ngOnInit(): void {

    // ✔ Charger tous les livres
    this.livreService.listeLivre().subscribe(livs => {
      console.log("Livres chargés :", livs);
      this.livres = livs;
      this.allLivres = livs;
    });

  }

  // ✔ Filtrer localement lorsque l’utilisateur tape
  onKeyUp(filterText: string) {
    this.livres = this.allLivres.filter(item =>
      item.nomLivre.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  /* Exemple pour suppression
  supprimerLivre(l: Livre) {
    if (confirm("Êtes-vous sûr ?")) {
      this.livreService.supprimerLivre(l.idLivre).subscribe(() => {
        this.ngOnInit(); // rafraîchir liste
      });
    }
  }
  */

}
