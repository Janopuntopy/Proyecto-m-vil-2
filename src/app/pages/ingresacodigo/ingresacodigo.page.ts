import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresacodigo',
  templateUrl: './ingresacodigo.page.html',
  styleUrls: ['./ingresacodigo.page.scss'],
  standalone: false,
})
export class IngresacodigoPage implements OnInit {

  codigo = '';

  constructor(private router: Router) {}

  validarCodigo(){
    const codigoGuardado = localStorage.getItem('reset_code');

    if(this.codigo === codigoGuardado){
      alert("codigo correcto!");
      this.router.navigate([''])
    }else{
      alert("codigo incorrecto.");
    }
  }

  ngOnInit() {
  }

}
