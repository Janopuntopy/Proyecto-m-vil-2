import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  pass: string = '';

  //defino una variable global para guardar el nombre(key) del campo no ingresado
 

  constructor(private toastController: ToastController, private router:Router, private validaciones: Validaciones) { }

  ngOnInit() {
  }
  //validateModel sirve para validar que singrese algo en los campos del html medieante su modelo

  validarVacio(){
    if (!this.validaciones.obligatorio(this.usuario)){
      this.presentToast('middle','Falta usuario');
      return;
    }

    if (!this.validaciones.obligatorio(this.pass)){
      this.presentToast('middle','Falta contraseña');
      return;
    }
    this.router.navigate(['/home'])
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
