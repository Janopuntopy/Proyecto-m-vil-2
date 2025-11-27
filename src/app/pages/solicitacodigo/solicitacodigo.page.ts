import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Emailservice } from 'src/app/services/emailservice';
import { Validaciones } from 'src/app/services/validaciones';

@Component({
  selector: 'app-solicitacodigo',
  templateUrl: './solicitacodigo.page.html',
  styleUrls: ['./solicitacodigo.page.scss'],
  standalone: false,
})
export class SolicitacodigoPage implements OnInit {

  email = '';
  nombre = '';

  constructor(private emailservice: Emailservice, private toastcontroller: ToastController, private validaciones: Validaciones) {}

  ngOnInit() {
  }

  async validarCorreo() {
    if (!this.email || !this.validaciones.validaMail(this.email)) {
      this.presentToast("middle","Ingrese correo válido",1500);
      return;
    }

    try {
    const respuesta = await this.emailservice.enviarCodigo(this.email, this.nombre);

      if (respuesta.ok) {
        this.presentToast("middle","Codigo enviado correctamente!",1500);
        } else {
          this.presentToast("middle","Error al enviar código...",1500);
        }
    }catch{
      this.presentToast("middle","Error.",1500);
    }
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
