import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Validaciones {

  //validar vacio
  obligatorio(value: any): boolean {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  }

  //validar correo
  validaMail(value: string): boolean{
    if (!this.obligatorio(value)) return false;
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formatoEmail.test(value);
  }

  validaNum(value: string, minLength: number = 9): boolean {
     if (!value) return false;
    return value.length >= minLength && /^[0-9]+$/.test(value);
  }

}
