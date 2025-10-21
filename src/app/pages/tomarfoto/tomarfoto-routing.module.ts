import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarfotoPage } from './tomarfoto.page';

const routes: Routes = [
  {
    path: '',
    component: TomarfotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarfotoPageRoutingModule {}
