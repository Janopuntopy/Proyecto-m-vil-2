import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacodigoPage } from './solicitacodigo.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacodigoPageRoutingModule {}
