import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Theme } from '../model/theme.model';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-update-livre',
  standalone: true, 
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-livre.html',
  styles: ``
})
export class UpdateLivre  implements OnInit{
  currentLivre  = new Livre(); 
  themes! : Theme[]; 
  updatedTheId! : number;
  myForm!: FormGroup; 
   constructor(private activatedRoute: ActivatedRoute,
              private router :Router, 
              private livreService: LivreService,
              private formBuilder: FormBuilder) { } 
  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params['id']);
    this.livreService.listeThemes().subscribe(thes => { console.log(thes);
       this.themes = thes._embedded.themes; });
    /*this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']). subscribe( liv =>{ this.currentLivre = liv; } ) ; 
    this.updatedTheId= this.currentLivre.theme.idThe;*/
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).subscribe(liv => { 
      this.currentLivre = liv; 
      this.updatedTheId! = this.currentLivre.theme!.idThe;
     });
    console.log(this.currentLivre);

    this.myForm = this.formBuilder.group({  
      idLivre : ['', [Validators.required
      ]],
      nomLivre : ['', [Validators.required]],
      auteur : ['', [Validators.required, Validators.minLength(4)]],
      prixLivre : ['', [Validators.required,Validators.min(1)]],
      Datedepublication : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      idThe : ['', [Validators.required]], 
    } ); 
  
  }
  
  updateLivre()
  { 
    //console.log(this.currentLivre);
    this.currentLivre.theme = this.themes.find(the => the.idThe == this.updatedTheId)!;
    this.livreService.updateLivre(this.currentLivre).subscribe(liv => { this.router.navigate(['livres']); });
  }
  

}
