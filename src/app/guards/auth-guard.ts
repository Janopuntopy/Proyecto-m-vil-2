import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { __awaiter } from 'tslib';
import { Bdlocal } from '../services/bdlocal';
import { Storageservice } from '../services/storageservice';

Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private storageService: Storageservice,  private router: Router, private bdlocal: Bdlocal){}

  async canActivate(): Promise<boolean> {
    /*/const autenticado = await this.bdlocal.autenticar(correo: String) Promise<boolean>;
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { correo?: string };
    const correo = state?.correo || '';
    const autenticado = await this.bdlocal.autenticar(correo);*/
    const hayUsuario = await this.storageService.usuarioExiste();
    if (hayUsuario){
      this.router.navigate(['/home']);
      return true;
    }else{
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}

