import { Component, OnInit } from '@angular/core';
import { Emailservice } from 'src/app/services/emailservice';

@Component({
  selector: 'app-solicitacodigo',
  templateUrl: './solicitacodigo.page.html',
  styleUrls: ['./solicitacodigo.page.scss'],
  standalone: false,
})
export class SolicitacodigoPage implements OnInit {

  email = '';

  constructor(private emailservice: Emailservice) {}

  ngOnInit() {
  }

  async validarCorreo() {
    if (!this.email) {
      alert("Ingresa un correo válido.");
      return;
    }
 

  const respesta = await this.emailservice.enviarCodigo(this.email);

  if (respesta.ok) {
      alert("Se ha enviado un correo con tu código de recuperación.");
    } else {
      alert("Error enviando correo.");
  }
 }
}
