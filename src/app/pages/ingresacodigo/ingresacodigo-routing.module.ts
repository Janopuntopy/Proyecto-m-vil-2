import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresacodigoPage } from './ingresacodigo.page';

const routes: Routes = [
  {
    path: '',
    component: IngresacodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresacodigoPageRoutingModule {}
