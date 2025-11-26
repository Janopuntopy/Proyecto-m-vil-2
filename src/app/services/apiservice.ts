import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

   private apiURL = 'https://pokeapi.co/api/v2';

  constructor (private http: HttpClient) { }

     // busco todos los pokemones
  getPokemons(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiURL}/pokemon?limit=${limit}&offset=${offset}`);
  }

  // buscar info de pokemon especifico
  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiURL}/pokemon/${name}`);
  }

  //buscar info pokemon por id
  getPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getPokemonList(limit: number): Observable<any> {
  return this.http.get<any>(`${this.apiURL}?limit=${limit}`);
  }

}
