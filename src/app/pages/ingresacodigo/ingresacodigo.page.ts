import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Storageservice } from 'src/app/services/storageservice';

@Component({
  selector: 'app-ingresacodigo',
  templateUrl: './ingresacodigo.page.html',
  styleUrls: ['./ingresacodigo.page.scss'],
  standalone: false,
})
export class IngresacodigoPage implements OnInit {

  codigo = '';

  constructor(private storageservice: Storageservice,private router: Router, private storage: Storage, private toastcontroller: ToastController) {}

  ngOnInit() {
    this.storageservice.Init();
  }

  async validarCodigo(){
    const codigoGuardado = await this.storage.get('reset_code');
    if(this.codigo === codigoGuardado){
      this.presentToast('middle','codigo correcto!',1500);
      this.router.navigate(['/recuperapass'])
    }else{
      this.presentToast('middle','codigo incorrecto...',1500);
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
