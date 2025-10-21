import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storageservice } from './storageservice';
import { Bdlocal } from './bdlocal';
import { Perfil } from '../clase/perfil';
import { Perfiles } from '../interfaces/perfiles';

@Injectable({
  providedIn: 'root'
})
export class Routeservice {
  
  perfiles: Perfiles[] = [];

  constructor(public toastcontroller: ToastController, private storage: Storageservice, private bdlocal: Bdlocal){} 

  //metodo para saber si hay usuario registrado consultando a SQLite
  async estaAutenticado(): Promise<boolean> {
    await this.storage.buscarPerfil('correo');
    const usuario = this.perfiles;

    if (usuario) {
      const valido = await this.bdlocal.autenticar('perfil');
      return valido;
    }

    return false;
  }

  async cerrarSesion(): Promise<void> {
    await this.storage.remove('usuario');
  }

  async presentToast(mensaje: string){
    const toast = await this.toastcontroller.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position:'top',
      duration:2000
    })
    toast.present();
  }


}
