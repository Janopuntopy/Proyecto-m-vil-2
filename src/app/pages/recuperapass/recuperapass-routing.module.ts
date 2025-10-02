import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperapassPage } from './recuperapass.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperapassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperapassPageRoutingModule {}
