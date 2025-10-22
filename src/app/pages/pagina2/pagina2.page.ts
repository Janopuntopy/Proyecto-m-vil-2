import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Perfiles } from 'src/app/interfaces/perfiles';
import { Bdlocal } from 'src/app/services/bdlocal';
import { Storageservice } from 'src/app/services/storageservice';
import { Validaciones } from 'src/app/services/validaciones';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
  standalone: false,
})
export class Pagina2Page implements OnInit {

  usuario: Perfiles = {
    nombre: '',
    correo: '',
    password: '',
    telefono: ''
  };

  nombre: string = "";
  correo: string = "";
  password: string = "";
  telefono: string = "";

  perfiles: any = [];

  constructor(private toastController: ToastController, private router:Router, private validaciones: Validaciones, private bdlocal: Bdlocal, private storageservice: Storageservice) { }

  ngOnInit() {
  }

  async registrar() {
    const ok = await this.storageservice.registrarUsuario(this.usuario);
    if (ok) {
      alert('Usuario registrado con éxito');
    } else {
      alert('El correo ya está registrado');
    }
  }

  //------------------------------------------------------

  async validarVacio(){
    if (!this.validaciones.obligatorio(this.nombre)){
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

    //this.bdlocal.agregarPerfil(this.usuario,this.correo,this.password,this.telefono)
    await this.storageservice.set('perfiles', {nombre: this.nombre, correo: this.correo, password: this.password, telefono: this.telefono })

    this.presentToast('middle','éxito ' + this.nombre + this.correo);
    

    let NavigationExtras: NavigationExtras = {
      state: {usuario: this.nombre}
    }
    this.router.navigate(['/home'], NavigationExtras)

  }

  async guardarPerfil(){
    await this.bdlocal.agregarPerfil(this.nombre, this.correo, this.password, this.telefono);
    this.cargarPerfiles();
  }
  
  async cargarPerfiles() {
    this.perfiles = this.bdlocal.fetchPerfiles();
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
