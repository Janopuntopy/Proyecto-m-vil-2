import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Bdlocal } from 'src/app/services/bdlocal';
import { Storageservice } from 'src/app/services/storageservice';
import { Validaciones } from 'src/app/services/validaciones';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  //declarar un modelo para validar
  usuario: string = '';
  password: string = ''; 

  constructor(private storage: Storageservice, private bdlocal: Bdlocal, private toastController: ToastController, private router:Router, private validaciones: Validaciones) { }

  ngOnInit() {
    
  }

  //validateModel sirve para validar que singrese algo en los campos del html medieante su modelo

  validarVacio(){
    if (!this.validaciones.obligatorio(this.usuario)){
      this.presentToast('middle','Falta usuario');
      return;
    }
    if (!this.validaciones.obligatorio(this.password)){
      this.presentToast('middle','Falta contraseña');
      return;
    }
    this.inicioSesion();
  }

  async inicioSesion(){
    const exitoso = await this.storage.usuarioExiste()
    if (exitoso){
      this.presentToast('top', 'Inicio exitoso!');
      let navigationExtras : NavigationExtras = {
        state : {usuario : this.usuario}
      }
      this.router.navigate(['/home'], navigationExtras);    
    }else{
      this.presentToast('top', 'Usuario o contraseña incorrectos');
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg : string, duration?:number ){
    const toast = await this.toastController.create({
      message : msg,
      duration: duration?duration:1500,
      position : position,
    });

    await toast.present();
    
  }
}
