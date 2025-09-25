import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
  standalone: false,
})
export class Pagina2Page implements OnInit {

  CrearUser: any ={
    usuario:"",
    password:"",
    correo: "",
    telefono:""
  }

  constructor(private toastController: ToastController, private router:Router) { }

  vacio: string = "";

  ngOnInit() {
  }

  
  Creacion(){
    console.log(this.CrearUser)
    this.presentToast('top',"Iniciando sesión..."+this.CrearUser.usuario)
    this.router.navigate(['/inicio'])
  }

    validar(){
    if (this.validateModel(this.CrearUser)){
      let navigationExtras : NavigationExtras = {state: {login: this.CrearUser}};
      this.router.navigate(['/home'], navigationExtras)
    }else{
      this.presentToast("middle", "Error: Falta " + this.vacio,2000)
    }
  }

  validateModel(model: any){
    for(var[key,value] of Object.entries(model)){
      if (value==""){
        this.vacio = key;
        return false;
      }
    }
    return true;
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
