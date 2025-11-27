import { Component, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre';
import { Router, RouterLink } from '@angular/router';
import { Theme } from '../model/theme.model';
import { CommonModule } from '@angular/common';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { AbstractControl, AsyncValidatorFn ,ValidationErrors, ValidatorFn } from '@angular/forms';
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: 'app-add-livre',
  standalone: true, 
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-livre.html',
  styleUrl: './add-livre.css'
})
export class AddLivre implements OnInit {
  newLivre = new Livre(); 
  themes! : Theme[];
  newIdThe! : number; 
  newTheme! : Theme;
  message! : string;
  myForm!: FormGroup; 
  constructor(private livreService: LivreService,private router :Router,private formBuilder: FormBuilder) { } 
  ngOnInit(): void {
   this.livreService.listeThemes().subscribe(thes => { 
      console.log(thes); 
      this.themes = thes._embedded.themes; });


function uniqueIdValidator(livreService: LivreService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return livreService.listeLivre().pipe(
      map(livres => {
        const ids = livres.map(l => l.idLivre);
        return ids.includes(control.value) ? { idNotUnique: true } : null;
      })
    );
  };
}

    
    this.myForm = this.formBuilder.group({  
      /*idLivre : ['', [Validators.required, uniqueIdValidator(this.livreService)
      ]],*/
      nomLivre : ['', [Validators.required]],
      auteur : ['', [Validators.required,Validators.minLength(4)]],
      prixLivre : ['', [Validators.required,Validators.min(1)]],
      Datedepublication : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      idThe : ['', [Validators.required]], 
    } ); 
  }

  addLivre(){ 
    //console.log(this.newLivre); 
    this.newLivre.theme = this.themes.find(the => the.idThe == this.newIdThe)!;
    this.livreService.ajouterLivre(this.newLivre).subscribe(liv => {
      console.log(liv);
      this.router.navigate(['livres']);
    });
  }
   
}
