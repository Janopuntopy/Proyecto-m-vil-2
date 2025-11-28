import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storageservice } from 'src/app/services/storageservice';

@Component({
  selector: 'app-recuperapass',
  templateUrl: './recuperapass.page.html',
  styleUrls: ['./recuperapass.page.scss'],
  standalone: false,
})
export class RecuperapassPage implements OnInit {

  pass1 = '';
  pass2 = '';

  constructor(private toastcontroller: ToastController, private storageservice: Storageservice, private router: Router) { }

  async ngOnInit() {
    await this.storageservice.Init();
  }

  //Valida campos vacios
  async cambiarPass(){
    if (!this.pass1 || !this.pass2){
      this.presentToast("middle","Ingrese ambas contraseñas.",1500);
      return;
    }

    //valida coincidencia
    if (this.pass1 !== this.pass2){
      this.presentToast("middle","Contraseñas no coinciden...",1500);
      return;
    }

    //const correoActual = await this.storageservice.get('correo_recuperacion');
    const usuarios = await this.storageservice.get('usuarios') || [];
    
    //const usuario = usuarios.find((u: any) => u.correo === correoActual);

    if (!usuarios) {
      this.presentToast("middle","Error: usuario no encontrado",1500);
      return;
    }

    usuarios.password = this.pass1;

    await this.storageservice.set('usuarios', usuarios);

    this.pass1 = '';
    this.pass2 = '';

    this.presentToast("middle","Contraseña cambiada con éxito!",1500);
    this.router.navigate(['/inicio'])
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
