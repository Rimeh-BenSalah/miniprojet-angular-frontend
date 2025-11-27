import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Theme } from '../model/theme.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThemeWrapper } from '../model/themeWrapped.model';
import { map } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class LivreService {
  apiURL: string = 'http://localhost:8090/livres/api';
  apiURLThe: string = 'http://localhost:8090/livres/the';
  modifierTheme(the: Theme) {
    throw new Error('Method not implemented.');
  }
  rechercherParNom(nomProduit: any) {
    throw new Error('Method not implemented.');
  }
  livres! : Livre[];
  livre! : Livre; 
  themes! : Theme[];
  livresRecherche! : Livre[];
  constructor(private http: HttpClient) { 
   }

listeLivre(): Observable<Livre[]> { 
    return this.http.get<Livre[]>(this.apiURL); }
  ajouterLivre(liv: Livre): Observable<Livre> { 
    return this.http.post<Livre>(this.apiURL, liv, httpOptions); }
  supprimerLivre(id: number) { 
    const url = `${this.apiURL}/${id}`; 
    return this.http.delete(url, httpOptions); }
  consulterLivre(id: number): Observable<Livre> { 
    const url = `${this.apiURL}/${id}`; 
    return this.http.get<Livre>(url); }
  updateLivre(liv: Livre): Observable<Livre> { 
    return this.http.put<Livre>(this.apiURL, liv, httpOptions); }


  //listeThemes():Observable<Theme[]>{ return this.http.get<Theme[]>(this.apiURL+"/the"); }
  listeThemes(): Observable<ThemeWrapper> { return this.http.get<ThemeWrapper>(this.apiURLThe); }
  consulterTheme(id: number): Theme {
    return this.themes.find(the => the.idThe == id)!;
  }
 rechercherParTheme(idThe: number):Observable< Livre[]> { const url = `${this.apiURL}/prodscat/${idThe}`; return this.http.get<Livre[]>(url); }

 ajouterTheme(the: Theme): Observable<Theme> {
  return this.http.post<Theme>(this.apiURLThe, the, httpOptions);
}

}
