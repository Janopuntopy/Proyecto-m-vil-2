import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { __awaiter } from 'tslib';
import { Bdlocal } from '../services/bdlocal';

Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private bdlocal: Bdlocal){}

  async canActivate(): Promise<boolean> {
    const autenticado = await this.bdlocal.autenticar();

    if (autenticado){
      return true;
    }else{
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}

