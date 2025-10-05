import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
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
    //ESTE PATH SIEMPRE VA AL FINAL, POR SU LECTURA SECUENCIAL
    path: '**',
    loadChildren: () => import('./pages/noencontrado/noencontrado.module').then( m => m.NoencontradoPageModule)
  },  {
    path: 'paginacomponente',
    loadChildren: () => import('./pages/paginacomponente/paginacomponente.module').then( m => m.PaginacomponentePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
