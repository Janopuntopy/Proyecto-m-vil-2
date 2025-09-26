import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoencontradoPage } from './noencontrado.page';

const routes: Routes = [
  {
    path: '',
    component: NoencontradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoencontradoPageRoutingModule {}
