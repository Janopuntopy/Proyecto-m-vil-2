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

  // Registrar usuario
  async registrarUsuario(usuario: Perfiles): Promise<boolean> {
    const usuarios: Perfiles[] = (await this._storage?.get(this.usuariosKey)) || [];
  
    // Validar si ya existe
    const existe = usuarios.find(u => u.correo === usuario.correo);
    if (existe) return false;

     usuarios.push(usuario);
    await this._storage?.set(this.usuariosKey, usuarios);
    return true;
  }

  async login(correo: string, password: string): Promise<boolean> {
    const usuarios: Perfiles[] = (await this._storage?.get(this.usuariosKey)) || [];

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);
    if (usuario) {
      await this._storage?.set(this.sesionKey, usuario);
      return true;
    }

    return false;
  }

  // Obtener usuario logueado
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

//-------------------------------------------------------------------------------------------------------

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

  
/*/
  //registra perfil de usuario y si el correo se encuentra registrado, no permite el registro.
  async guardarPerfiles(nombre: string, correo: string,  password: string, telefono: string){
    const existe = this.perfiles.find(c => c.correo === correo);
    if (!existe){
      this.perfiles.unshift({nombre:nombre, correo:correo, password:password, telefono:telefono})
      await this._storage?.set('perfiles',this.perfiles);
      this.presentToast("Usuario agregado con éxito!")
    }else{
      this.presentToast("Ya existe un usuario con el correo ingresado.")
      return;
    }
  }

  async get(key: string){
    return await this._storage?.get(key);
  }

  async remove(key: string){
    await this._storage?.remove(key);
  }
  
  //busca TODOS los perfiles
  async cargarPerfil(){
    const userPerfil = await this.storage.get('perfiles');
    if(userPerfil){
      this.perfiles=userPerfil;
    }
  }

  //busca perfil especifico

  async quitarPerfiles(correo: string){
    const existe=this.perfiles.find(c =>c.correo === correo)
    if (existe){
      this.perfiles=this.perfiles.filter(c=>c.correo!== correo);
      this._storage?.set('perfiles',this.perfiles);
      this.presentToast("Se ha eliminado perfil")
    }else{
      this.presentToast("El correo no se encuentra registrado")
    }
  }

  //elimina toda la informacion del storage además de la lista perfiles
  async borrarBD(){
    await this._storage?.clear();
    this.perfiles=[];
    console.log(this.perfiles.length);
    this.presentToast("Se ha eliminado la BD");
  }
*/


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
