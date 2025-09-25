import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  //declarar un modelo para validar [diccionario (key,value)]
  login: any ={
    usuario:"",
    password:""
  }

  //defino una variable global para guardar el nombre(key) del campo no ingresado
  vacio: string="";

  constructor(private toastController: ToastController, private router:Router) { }

  ngOnInit() {
  }
  //validateModel sirve para validar que singrese algo en los campos del html medieante su modelo

  iniciar(){
    console.log(this.login)
    this.presentToast('top',"Iniciando sesión..."+this.login.usuario)
    this.router.navigate(['/home'])
  }


  validar(){
    if (this.validateModel(this.login)){
      let navigationExtras : NavigationExtras = {
        state: {login: this.login}
      };
      this.router.navigate(['/home'], navigationExtras)
    }else{
      this.presentToast("middle", "Error: Falta " + this.vacio,1000)
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
