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

  perfiles: any = [];

  constructor(private routeservice: Routeservice, private storageservice: Storageservice, private bdlocal: Bdlocal, private toastController: ToastController, private router:Router, private validaciones: Validaciones) { }

  ngOnInit() {
    this.storageservice.Init();
  }

  /*/async login() {
    const correoGuardado = await this.storageservice.get('user_email');
    const passGuardada   = await this.storageservice.get('user_password');

    if (this.correo === correoGuardado && this.password === passGuardada) {
        this.presentToast('middle', 'Inicio de sesión exitoso', 1500);
        this.router.navigate(['/home']);
    } else {
        this.presentToast('middle', 'Correo o contraseña incorrectos', 1500);
    }
  }/*/

  async login() {
    const ok = await this.storageservice.login(this.correo, this.password);
    if (ok) {
      this.presentToast('middle','Inicio exitoso!',1500);
      this.router.navigate(['/home']);
    } else {
      this.presentToast('middle','error en correo o contraseña.',1500);
    }
  }

  async cerrarSesion() {
    await this.storageservice.logout();
    this.presentToast('middle','Sesión finalizada...',1500);
    this.router.navigate(['/login']);
  }

  ionViewWillEnter() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.['reset']) {
      this.correo = '';
      this.password = '';
    }
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
  }

  async Inicio(){

    const valido = await this.storageservice.autentica(this.correo, this.password);

    if (valido === true) {
      this.presentToast('top','Inicio de sesión exitoso',2000);
      this.router.navigate(['/home']);
    } else {
      this.presentToast('top','Correo o contraseña incorrectos',2000);
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
