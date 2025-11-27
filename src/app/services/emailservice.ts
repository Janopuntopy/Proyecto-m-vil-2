import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Emailservice {
  
  constructor(private storage: Storage) { 
   this.init();
  }

  async init(){
    await this.storage.create();
    emailjs.init(environment.emailjs.publicKey);
    console.log("EmailJS inicializado correctamente");
  }

  async enviarCodigo(correo: string, nombre: string) {

    console.log("correo recibido en enviarCodigo():", correo);
    console.log("nombre recibido:", nombre);

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Código generado:", codigo);

    //guardar correo y codigo temporalmente
    await this.storage.set('reset_email', correo);
    await this.storage.set('reset_code', codigo);
    console.log("Storage actualizado correctamente.");

    const params = {
      email: correo,
      code: codigo,
      name: nombre,
      link: 'http://localhost:8101//ingresacodigo'
    };
    console.log("Parámetros enviados a EmailJS:", params);

     try {
      console.log("ServiceID:", environment.emailjs.serviceId);
      console.log("TemplateID:", environment.emailjs.templateId);
      console.log("PublicKey:", environment.emailjs.publicKey);
      console.log("EmailJS:", emailjs);
      const resultado = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        params
      );

      console.log("RESULTADO EmailJS:", resultado);
      return { ok: true, codigo, correo, nombre, result: resultado };

    } catch (error) {
      console.error("ERROR COMPLETO EmailJS →", error);
      return { ok: false, error };
    }
  }
}
