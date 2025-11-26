import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Perfiles } from '../interfaces/perfiles';
import { Storage } from '@ionic/storage-angular';
import { Bdlocal } from './bdlocal';

@Injectable({
  providedIn: 'root'
})
export class Storageservice {
  
  perfiles: Perfiles[] = [];
  private usuariosKey = 'usuarios';
  private sesionKey = 'sesion';
  private _storage: Storage | null=null;
  private pokemonKey = 'pokemones';

  constructor(private bdlocal: Bdlocal, private storage: Storage, public toastController: ToastController){
    this.Init();
    this.cargarPerfil();
  }
  
  async Init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //-------Registrar usuario---------
  async registrarUsuario(usuario: Perfiles): Promise<boolean> {
    const usuarios: Perfiles[] = (await this._storage?.get(this.usuariosKey)) || [];
  
    // Validar si ya existe
    const existe = usuarios.find(u => u.correo === usuario.correo);
    if (existe) return false;

    //Registrar el usuario
    usuarios.push(usuario);

    //Guardar nuevamente la lista
    await this._storage?.set(this.usuariosKey, usuarios);
    return true;
  }

  async login(correo: string, password: string): Promise<boolean> {
    const usuarios: Perfiles[] = (await this._storage?.get(this.usuariosKey)) || [];

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);
    if (!usuario) return false;

    //await this._storage?.set(this.sesionKey, usuario);
    //return true;
  
    return true;
  }

  private async ensureInit() {
    if (this._storage === null) {
      this._storage = await this.storage.create();
      }
  }

  // Guardar sesión
  async guardarSesion(usuario: any): Promise<void> {
    await this.ensureInit();
    await this._storage!.set(this.sesionKey, usuario);
  }

  // Obtener sesión
  async getUsuarioSesion(): Promise<Perfiles | null> {
    return await this._storage?.get(this.sesionKey) || null;
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    await this._storage?.remove(this.sesionKey);
  }

  //------------------------------------------------------------------------------

  //guardar datos
  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  //obtener datos
  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  //eliminar datos
  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  //limpiar datos completamente
  async clear(): Promise<void> {
    await this._storage?.clear();
  }

  //verificar si existe un dato especifico
  async exists(key: string): Promise<boolean> {
    const value = await this._storage?.get(key);
    return value !== null && value !== undefined;
  }


  async autenticarUsuario(correo: string, password: string): Promise<boolean> {
  const perfil = await this.get('perfil');

  if (perfil && perfil.correo === correo && perfil.password === password) {
    return true;
  }
  return false;
  }

  async autentica(correo: string, password: string): Promise<boolean> {
    const perfiles: Perfiles[] = await this.get('perfiles') || [];
    const usuario = perfiles.find(p => p.correo === correo && p.password === password);
    return !!usuario;
  }

  async cargarPerfil(){
    const userPerfil = await this.storage.get('perfiles');
    if(userPerfil){
      this.perfiles=userPerfil;
    }
  }

//--------------------------------------------API POKEMON-----------------------------------------------------------

 // Guardar toda la lista
  async savePokemones(pokemons: any[]) {
    await this._storage?.set(this.pokemonKey, pokemons);
  }

  // Obtener lista
  async getPokemons(): Promise<any[]> {
    return (await this._storage?.get(this.pokemonKey)) || [];
  }

  // Agregar pokemon
  async addPokemon(pokemon: any) {
    const list = await this.getPokemons();
    list.push(pokemon);
    await this.savePokemones(list);
  }

  // Eliminar pokemon
  async removePokemon(name: string) {
    let list = await this.getPokemons();
    list = list.filter(p => p.name !== name);
    await this.savePokemones(list);
  }

  // Modificar pokemon
  async updatePokemon(updated: any) {
    let list = await this.getPokemons();
    const index = list.findIndex(p => p.name === updated.name);
    if (index !== -1) {
      list[index] = updated;
      await this.savePokemones(list);
    }
  }

  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position:'top',
      duration:2000
    })
    toast.present();
  }

}
