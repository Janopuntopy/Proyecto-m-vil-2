import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Emailservice {
  
  constructor(private storage: Storage) {}

 async enviarCodigo(correo: string, nombre = '') {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    await this.storage['set']('reset_email', correo);
    await this.storage['set']('reset_code', codigo);

    const params = {
      email: correo,
      code: codigo,
      name: nombre,
      link: 'localhost:8102/ingresacodigo'
    };

     try {
      const resultado = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        params,
        environment.emailjs.publicKey
      );

      return { ok: true, codigo, correo, result: resultado };

    } catch (error) {
      console.error('Error EmailJS', error);
      return { ok: false, error };
    }
  }
}
