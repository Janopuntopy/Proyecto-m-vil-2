import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Perfil } from 'src/app/clase/perfil';
import { Bdlocal } from 'src/app/services/bdlocal';
import { Storageservice } from 'src/app/services/storageservice';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  usuario : any;
  perfil: Perfil[] = []
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private storageservice: Storageservice, private toastController: ToastController, private activatedRoute: ActivatedRoute, private router: Router, private bdlocal: Bdlocal)
  
  {
    this.activatedRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
        console.log(this.usuario);
      }
    })
  }

  async ngOnInit(){
    await this.storageservice.cargarPerfil();
  }

  mostrarlista(){
    this.bdlocal.fetchPerfiles().subscribe({
      next: (data: Perfil[]) => {
        this.perfil = data;
        this.presentToast('middle', "Lista de usuarios!", 1000)
      },
    error: (err) => this.presentToast('middle','Error al cargar lista de usuarios', 1000)
    })
  }

  async mostrarListaStorage() {
    const perfilesGuardados = await this._storage?.get('perfiles');

    if (perfilesGuardados && perfilesGuardados.length > 0) {
      this.perfil = perfilesGuardados;
      this.presentToast('middle','Usuarios cargados correctamente!');
    } else {
      this.perfil = [];
      this.presentToast('middle','No hay usuarios registrados.');
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg : string, duration?:number ){
  const toast = await this.toastController.create({
    message : msg,
    duration: duration?duration:1500,
    position : position,
    });
  }

}
