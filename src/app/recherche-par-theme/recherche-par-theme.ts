import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Theme } from '../model/theme.model';

@Component({
  selector: 'app-recherche-par-theme',
  standalone: true,
  imports: [FormsModule, CommonModule, /*RouterLink*/],
  templateUrl: './recherche-par-theme.html',
  styles: ``
})
export class RechercheParTheme implements OnInit {

  livres: Livre[] = [];
  IdTheme!: number;
  themes: Theme[] = [];

  constructor(private livreService: LivreService) { }

  ngOnInit(): void {
    this.livreService.listeThemes(). subscribe(thes => {this.themes = thes._embedded.themes; console.log(thes); });
  }
  onChange() { this.livreService.rechercherParTheme(this.IdTheme). subscribe(livs =>{this.livres=livs}); }


}
