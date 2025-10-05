import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
  standalone:false,
})
export class Componente2Component  implements OnInit {
  generos:any[]=[
    {id:1,genero:"Urbano"},
    {id:2,genero:"Clásico"},
    {id:3,genero:"Rock"},
    {id:4,genero:"Jazz"}
  ]
  dato:any={
    compositor:"",
    interprete:"",
    genero:"",
    lanzamiento:""
  };
  constructor(private alertController : AlertController) { }

  ngOnInit() {}

  mostrar(){
    if (this.dato.compositor!="" && this.dato.interprete!="") {
      this.presentAlert("MusicDuoc","El Compositor es "+this.dato.compositor+" y el intérprete "+this.dato.interprete)
    } else {
      this.presentAlert("MusicDuoc","No ingreso Compositor y/o Intérprete");
    }
  }

  limpiar(){

    for(var [key,value] of Object.entries(this.dato)){
      Object.defineProperty(this.dato, key,{value:""})
    }

  }

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

