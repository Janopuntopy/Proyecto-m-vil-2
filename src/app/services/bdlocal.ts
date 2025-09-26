import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Perfiles } from '../interfaces/perfiles';
import { ToastController } from '@ionic/angular';
import { find } from 'rxjs';
import { __awaiter } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class Bdlocal {
  perfiles: Perfiles[] = [];
  private _storage: Storage | null=null;

  constructor(private storage: Storage, public toastController: ToastController){
    this.Init();
    this.cargarPerfiles();
  }

async Init(){
  const storage = await this.storage.create();
  this._storage = storage;
}

guardarPerfiles(nombre: string, contraseña: string, correo: string, telefono: number){
  const existe = this.perfiles.find(c => c.correoUsuario === correo);
  if (!existe){
    this.perfiles.unshift({ nombreUsusario:nombre, contraseñaUsuario:contraseña,correoUsuario:correo,telefonoUsuario:telefono})
    this._storage?.set('perfiles',this.perfiles);
    this.presentToast("Usuario agregado con éxito!")
  }else{
    this.presentToast("Ya existe un usuario con el correo ingresado.")
  }
}

async cargarPerfiles(){
  const allPerfiles = await this.storage.get('perfiles');
  if(allPerfiles)
  {
    this.perfiles=allPerfiles;
  }
}

async quitarPerfiles(correo: string){
  const existe=this.perfiles.find(c =>c.correoUsuario === correo)
  if (existe){
    this.perfiles=this.perfiles.filter(c=>c.correoUsuario !== correo);
    this._storage?.set('perfiles',this.perfiles);
    this.presentToast("Se ha eliminado perfil")
  }else{
    this.presentToast("El correo no se encuentra registrado")
  }
}

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
