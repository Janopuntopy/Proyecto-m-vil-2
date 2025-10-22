import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Bdlocal } from 'src/app/services/bdlocal';
import { Routeservice } from 'src/app/services/routeservice';
import { Storageservice } from 'src/app/services/storageservice';
import { Validaciones } from 'src/app/services/validaciones';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  correo = '';
  password = '';

  //declarar un modelo para validar
  /*/nombre: string = "";
  correo: string = "";
  password: string = "";
  telefono: string = "";*/

  perfiles: any = [];

  constructor(private routeservice: Routeservice, private storageservice: Storageservice, private bdlocal: Bdlocal, private toastController: ToastController, private router:Router, private validaciones: Validaciones) { }

  ngOnInit() {
    this.storageservice.Init();
  }

  async login() {
    const ok = await this.storageservice.login(this.correo, this.password);
    if (ok) {
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

  async cerrarSesion() {
    await this.storageservice.logout();
    alert('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  //------------------------------------------------------------------------------------

  //validateModel sirve para validar que singrese algo en los campos del html medieante su modelo

  validarVacio(){
    if (!this.validaciones.obligatorio(this.correo)){
      this.presentToast('middle','Falta usuario');
      return;
    }
    if (!this.validaciones.obligatorio(this.password)){
      this.presentToast('middle','Falta contraseña');
      return;
    }

    this.router.navigate(['/home']);
    //this.Inicio();
    //this.inicioSesion();
  }


  async Inicio(){
    //const datos = await this.storage.exists('perfil')
    const valido = await this.storageservice.autentica(this.correo, this.password);

    if (valido === true) {
      this.presentToast('top','Inicio de sesión exitoso',2000);
      this.router.navigate(['/home']);
    } else {
      this.presentToast('top','Correo o contraseña incorrectos',2000);
    }  
  } 

/*/
  async inicioSesion(){
    const exitoso = await this.storage.buscarPerfil('correo')
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
*/

  async presentToast(position: 'top' | 'middle' | 'bottom', msg : string, duration?:number ){
    const toast = await this.toastController.create({
      message : msg,
      duration: duration?duration:1500,
      position : position,
    });

    await toast.present();

  }
}
