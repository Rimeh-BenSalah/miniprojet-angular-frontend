import { Component, OnInit } from '@angular/core';
import { Theme } from '../model/theme.model';
import { LivreService } from '../services/livre';
import { CommonModule } from '@angular/common';
import { UpdateTheme } from '../update-theme/update-theme';

@Component({
  selector: 'app-liste-themes',
  standalone: true,
  imports: [CommonModule, UpdateTheme],
  templateUrl: './liste-themes.html',
  styles: ``
})
export class ListeThemes implements OnInit {

  themes! : Theme[]; 
  updatedThe:Theme = {"idThe":0,"nomThe":""};
  ajout:boolean=true;
  constructor(private livreService : LivreService) { } 
  ngOnInit(): void { this.livreService.listeThemes(). subscribe(thes => {
    this.themes = thes._embedded.themes; console.log(thes); });
}

themeUpdated(the:Theme){ console.log("the updated event",the);
   this.livreService.ajouterTheme(the). subscribe( ()=> this.chargerThemes()); }
chargerThemes(){
  this.livreService.listeThemes(). subscribe(thes => {this.themes = thes._embedded.themes; console.log(thes); }); }
//updateThe(the:Theme) { this.updatedThe=the; }

updateThe(the:Theme) { this.updatedThe=the;
   this.ajout=false; }
}
