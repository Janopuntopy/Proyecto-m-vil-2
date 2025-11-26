import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    //canActivate: [AuthGuard] // aqui protege la ruta
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'pagina2',
    loadChildren: () => import('./pages/pagina2/pagina2.module').then( m => m.Pagina2PageModule)
  },
  {
    path: 'recuperapass',
    loadChildren: () => import('./pages/recuperapass/recuperapass.module').then( m => m.RecuperapassPageModule)
  },
    {
    path: 'consumoapi',
    loadChildren: () => import('./pages/consumoapi/consumoapi.module').then( m => m.ConsumoapiPageModule)
  },
  {
    path: 'tomarfoto',
    loadChildren: () => import('./pages/tomarfoto/tomarfoto.module').then( m => m.TomarfotoPageModule)
  },
  {
    path: 'solicitacodigo',
    loadChildren: () => import('./pages/solicitacodigo/solicitacodigo.module').then( m => m.SolicitacodigoPageModule)
  },
  {
    path: 'ingresacodigo',
    loadChildren: () => import('./pages/ingresacodigo/ingresacodigo.module').then( m => m.IngresacodigoPageModule)
  },
  {
    //ESTE PATH SIEMPRE VA AL FINAL, POR SU LECTURA SECUENCIAL
    path: '**',
    loadChildren: () => import('./pages/noencontrado/noencontrado.module').then( m => m.NoencontradoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
