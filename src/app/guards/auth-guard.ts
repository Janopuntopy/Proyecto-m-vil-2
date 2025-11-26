import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { __awaiter } from 'tslib';
import { Bdlocal } from '../services/bdlocal';
import { Storageservice } from '../services/storageservice';
import { Routeservice } from '../services/routeservice';
import { ToastController } from '@ionic/angular';

Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private storageservice: Storageservice ,private routeservice: Routeservice , private router: Router, private toastcontroller: ToastController){}

  async canActivate(): Promise<boolean> {
    const hayUsuario = await this.storageservice.getUsuarioSesion();   

    if (hayUsuario) {
      const perfiles = await this.storageservice.get('perfiles'); 
      const existe = perfiles?.find((p: any) => p.correo === hayUsuario.correo);
      
      if(existe){
        return true;
      }      
    }
  
    this.router.navigate(['/inicio']);
    return false;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg : string, duration?:number ){
  const toast = await this.toastcontroller.create({
    message : msg,
    duration: duration?duration:1500,
    position : position,
  });

  await toast.present();  
  }

}
