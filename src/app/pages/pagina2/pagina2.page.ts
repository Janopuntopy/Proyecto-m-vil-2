import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Perfil } from 'src/app/clase/perfil';
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


    nombre = '';
    correo = '';
    password = '';
    telefono = '';

  constructor(private toastController: ToastController, private router:Router, private validaciones: Validaciones, private bdlocal: Bdlocal, private storageservice: Storageservice) { }

  ngOnInit() {
  }

  async registrar() {
    const usuario: Perfiles = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      telefono: this.telefono
    };

    const ok = await this.storageservice.registrarUsuario(usuario);
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

    const usuario: Perfiles = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      telefono: this.telefono
    }

    //this.bdlocal.agregarPerfil(this.usuario,this.correo,this.password,this.telefono)
    await this.storageservice.registrarUsuario(usuario)

    this.presentToast('middle','éxito ' + this.nombre + this.correo);
    
    let NavigationExtras: NavigationExtras = {
      state: {usuario: this.nombre}
    }
    this.router.navigate(['/inicio'], NavigationExtras)

  }

  /*/sync guardarPerfil(){
    await this.bdlocal.agregarPerfil(this.nombre, this.correo, this.password, this.telefono);
    this.cargarPerfiles();
  }/*/
  
  /*/async cargarPerfiles() {
    this.perfiles = this.bdlocal.fetchPerfiles();
  }/*/

  async presentToast(position: 'top' | 'middle' | 'bottom', msg : string, duration?:number ){
    const toast = await this.toastController.create({
      message : msg,
      duration: duration?duration:1500,
      position : position,
    });

  await toast.present();
  
  }
}
