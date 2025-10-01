import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Validaciones } from 'src/app/services/validaciones';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
  standalone: false,
})
export class Pagina2Page implements OnInit {


  usuario: string = "";
  password: string = "";
  correo: string = "";
  telefono: string = "";


  constructor(private toastController: ToastController, private router:Router, private validaciones: Validaciones) { }

  ngOnInit() {
  }

 validarVacio(){
    if (!this.validaciones.obligatorio(this.usuario)){
      this.presentToast('middle','Falta usuario');
      return;
    }
    if (!this.validaciones.obligatorio(this.password)){
      this.presentToast('middle','Falta contraseña');
      return;
    }
    if (!this.validaciones.validaMail(this.correo)){
      this.presentToast('middle','Correo inválido');
      return;
    }
    if (!this.validaciones.validaNum(this.telefono)){
      this.presentToast('middle','Telefono inválido');
      return;
    }
    let NavigationExtras: NavigationExtras = {
      state: {usuario: this.usuario}
    }
    this.router.navigate(['/home'], NavigationExtras)

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
