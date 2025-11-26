import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-ingresacodigo',
  templateUrl: './ingresacodigo.page.html',
  styleUrls: ['./ingresacodigo.page.scss'],
  standalone: false,
})
export class IngresacodigoPage implements OnInit {

  codigo = '';

  constructor(private router: Router, private storage: Storage) {}

  validarCodigo(){
    const codigoGuardado = localStorage.getItem('reset_code');

    if(this.codigo === codigoGuardado){
      alert("codigo correcto!");
      this.router.navigate([''])
    }else{
      alert("codigo incorrecto.");
    }
  }

  async validarCodigoIngresado(codigoIngresado: string) {

    const codigoGuardado = await this.storage.get('reset_code');

    if (codigoIngresado === codigoGuardado) {
      return { ok: true };
    } else {
      return { ok: false, reason: 'wrong' };
    }
  }

  ngOnInit() {
  }

}
