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

   // Valida campos vacíos y actualiza la contraseña del usuario correspondiente
  async cambiarPass() {
    // 1) Validaciones locales
    if (!this.pass1 || !this.pass2) {
      this.presentToast("middle", "Ingrese ambas contraseñas.", 1500);
      return;
    }
    if (this.pass1 !== this.pass2) {
      this.presentToast("middle", "Contraseñas no coinciden...", 1500);
      return;
    }

    // 2) Obtener el correo que se guardó en el proceso de recuperación
    const correoActual: string | null = await this.storageservice.get('correo_recuperacion');
    if (!correoActual) {
      this.presentToast("middle", "Error: no se encontró correo de recuperación.", 1500);
      return;
    }

    // 3) Cargar la lista de usuarios (array)
    const usuarios: any[] = (await this.storageservice.get('usuarios')) || [];

    // 4) Buscar el usuario dentro del array por su correo
    const idx = usuarios.findIndex(u => u.correo === correoActual);
    if (idx === -1) {
      this.presentToast("middle", "Error: usuario no encontrado.", 1500);
      return;
    }

    // 5) Actualizar la contraseña del usuario encontrado
    usuarios[idx].password = this.pass1;

    // 6) Guardar nuevamente la lista completa en storage
    await this.storageservice.set('usuarios', usuarios);

    // 7) Limpiar campos y feedback
    this.pass1 = '';
    this.pass2 = '';

    // opcional: quitar correo_recuperacion si ya no se necesita
    await this.storageservice.remove?.('correo_recuperacion');

    this.presentToast("middle", "Contraseña cambiada con éxito!", 1500);
    this.router.navigate(['/inicio']);
  }

/*/
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
  }/*/

  async presentToast(position: 'top' | 'middle' | 'bottom', msg : string, duration?:number ){
  const toast = await this.toastcontroller.create({
    message : msg,
    duration: duration?duration:1500,
    position : position,
  });

  await toast.present();

  }

}
