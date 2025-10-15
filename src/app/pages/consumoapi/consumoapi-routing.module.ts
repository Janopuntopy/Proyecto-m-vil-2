import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumoapiPage } from './consumoapi.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumoapiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumoapiPageRoutingModule {}
