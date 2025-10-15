import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/services/apiservice';

@Component({
  selector: 'app-consumoapi',
  templateUrl: './consumoapi.page.html',
  styleUrls: ['./consumoapi.page.scss'],
  standalone: false,
})
export class ConsumoapiPage implements OnInit {

  pokemones: any[] = [];

  constructor(private api: Apiservice) { }

  ngOnInit(): void {
    this.api.getPokemons(25).subscribe({
      next: (data) => {
        this.pokemones = data.results;
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon:', error);
      }
    })
  }

}
