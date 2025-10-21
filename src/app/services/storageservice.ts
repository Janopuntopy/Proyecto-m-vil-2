import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Perfiles } from '../interfaces/perfiles';
import { Storage } from '@ionic/storage-angular';
import { Bdlocal } from './bdlocal';
import { __awaiter } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class Storageservice {
  
  perfiles: Perfiles[] = [];
  private _storage: Storage | null=null;

  constructor(private bdlocal: Bdlocal, private storage: Storage, public toastController: ToastController){
    this.Init();
    this.cargarPerfil();
  }
  
  async Init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

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
  async buscarPerfil(correo: string) {
    const perfilEncontrado = this.perfiles.find(p => p.correo === correo);
    if (perfilEncontrado) {
      console.log('Perfil encontrado:', perfilEncontrado);
      this.presentToast('Usuario encontrado: ${perfilEncontrado.correo}');
      return perfilEncontrado;
    } else {
      this.presentToast('No se encontró usuario');
      return null;
    }
  }

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
