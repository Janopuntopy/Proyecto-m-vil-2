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

  correo: string = "";
  password: string = "";

  perfiles: any = [];


  constructor(private storageservice: Storageservice ,private routeservice: Routeservice , private router: Router, private toastcontroller: ToastController){}

  async canActivate(): Promise<boolean> {
    /*/const autenticado = await this.bdlocal.autenticar(correo: String) Promise<boolean>;
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { correo?: string };
    const correo = state?.correo || '';
    const autenticado = await this.bdlocal.autenticar(correo);*/
    const hayUsuario = await this.storageservice.get('perfiles'); 
    if (!hayUsuario){
      this.presentToast('middle','no ingresa')
      this.router.navigate(['/inicio']);
      return false;
    }

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

