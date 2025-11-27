import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperapass',
  templateUrl: './recuperapass.page.html',
  styleUrls: ['./recuperapass.page.scss'],
  standalone: false,
})
export class RecuperapassPage implements OnInit {

  pass1 = '';
  pass2 = '';

  constructor(private toastcontroller: ToastController, private storage: Storage) { }

  async ngOnInit() {
    await this.storage['create']();
  }

  //Valida campos vacios
  async cambiarPass(){
    if (this.pass1 || this.pass2){
      this.presentToast("middle","Ingrese ambas contraseñas.",1500);
      return;
    }

    //valida coincidencia
    if (this.pass1 !== this.pass2){
      this.presentToast("middle","Contraseñas no coinciden...",1500);
      return;
    }
    
    await this.storage['set']('user_password', this.pass1);

    this.pass1 = '';
    this.pass2 = '';

    this.presentToast("middle","Contraseña cambiada con éxito!",1500);
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
