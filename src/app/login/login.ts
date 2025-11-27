import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  //erreur=0;
  erreur : boolean=false;
  user = new User();
  constructor(private authService : Auth, private router: Router) { }
  onLoggedin() { 
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
     if (isValidUser) this.router.navigate(['/']); 
     else this.erreur =true;
      //this.erreur = 1;
      //alert('Login ou mot de passe incorrecte!');
  }
}
