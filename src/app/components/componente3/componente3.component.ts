import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/services/apiservice';
import { Storageservice } from 'src/app/services/storageservice';

@Component({
  selector: 'app-componente3',
  templateUrl: './componente3.component.html',
  styleUrls: ['./componente3.component.scss'],
  standalone:false,
})
export class Componente3Component  implements OnInit {

  pokemonName: string = '';
  nombre: string = '';
  tipo: string = '';
  ataque: number = 0;

  pokemoness: any[] = [];
  pokemon: any = null;

  pokemonList: { name: string, url: string }[] = [];
  maxPokemons: number = 0;

  constructor(private api: Apiservice, private storage: Storageservice) { }

  ngOnInit(){

  }

  buscarPokemon() {
    const nombreBuscado = this.pokemonName.trim().toLowerCase();

    if (!nombreBuscado) {
      alert('Por favor ingresa un nombre de Pokémon');
      return;
    }

    this.api.getPokemonByName(nombreBuscado).subscribe({
      next: (data) => {
        this.nombre = data.name;
        this.tipo = data.types[0].type.name;

        // Buscar el primer stat de tipo "attack"
        const ataqueStat = data.stats.find((stat: any) => stat.stat.name === 'attack');
        this.ataque = ataqueStat ? ataqueStat.base_stat : 0;
      },
      error: (err) => {
        alert('No se encontró el Pokémon');
        this.nombre = '';
        this.tipo = '';
        this.ataque = 0;
      }
    });
  }

  listarPokemones() {
  if (!this.maxPokemons || this.maxPokemons <= 0) {
    alert('Ingresa un número válido');
    return;
  }

  this.api.getPokemonList(this.maxPokemons).subscribe({
    next: (response) => {
      this.pokemonList = response.results;
    },
    error: () => {
      alert('Error al obtener la lista de Pokémons');
      this.pokemonList = [];
    }
  });
  }

  getPokemonImage(url: string): string {
    const id = url.split('/').filter(part => !!part).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }


//---------------------------------------------------------------------------------------------

  async ionViewWillEnter() {
      this.pokemoness = await this.storage.getPokemons();
    }

  buscaPokemon() {
      this.api.getPokemonByName(this.pokemonName).subscribe({
        next: (data) => this.pokemon = data,
        error: () => this.pokemon = null
      });
    }

  async guardarPokemon() {
      if (this.pokemon) {
        await this.storage.addPokemon(this.pokemon);
        this.pokemoness = await this.storage.getPokemons();
      }
    }
  
  async eliminarPokemon(name: string) {
    await this.storage.removePokemon(name);
    this.pokemoness = await this.storage.getPokemons();
  }

  async modificarPokemon(pokemon: any) {
    // ejemplo simple: cambiar el nombre localmente
    pokemon.alias = prompt('Nuevo alias para ' + pokemon.name, pokemon.alias || '');
    await this.storage.updatePokemon(pokemon);
    this.pokemoness = await this.storage.getPokemons();
  }


}