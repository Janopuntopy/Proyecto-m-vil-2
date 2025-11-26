import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperapass',
  templateUrl: './recuperapass.page.html',
  styleUrls: ['./recuperapass.page.scss'],
  standalone: false,
})
export class RecuperapassPage implements OnInit {

  pass1 = '';
  pass2 = '';

  constructor() { }

  cambiarPass(){
    if (this.pass1 !== this.pass2){
      alert("Las contraseñas no coinciden.");
      return;
    }

    localStorage.setItem('user_password', this.pass1);

    alert("Contraseña cambiada con éxito.");
  }

  ngOnInit() {
  }

}
