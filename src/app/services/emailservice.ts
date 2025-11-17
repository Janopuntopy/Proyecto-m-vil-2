import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Emailservice {
  
  constructor() {}

 async enviarCodigo(correo: string) {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem('reset_email', correo);
    localStorage.setItem('reset_code', codigo);

    const params = {
      to_email: correo,
      code: codigo,
      message: `Tu código de recuperación es: ${codigo}`
    };

     try {
      const resultado = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        params,
        environment.emailjs.publicKey
      );

      return { ok: true, result: resultado };

    } catch (error) {
      console.error('Error EmailJS', error);
      return { ok: false, error };
    }
  }
}
