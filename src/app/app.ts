import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('livres');
  constructor (public authService: Auth,private router : Router) {}
  onLogout(){ 
    this.authService.logout(); }
  ngOnInit () { 
    let isloggedin: string; 
    let loggedUser:string; 
    isloggedin = localStorage.getItem('isloggedIn') !; 
    loggedUser = localStorage.getItem('loggedUser') !; 
    if (isloggedin!="true" || !loggedUser) this.router.navigate(['/login']); 
    else this.authService.setLoggedUserFromLocalStorage(loggedUser); }

}
