import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacodigoPageRoutingModule } from './solicitacodigo-routing.module';

import { SolicitacodigoPage } from './solicitacodigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacodigoPageRoutingModule
  ],
  declarations: [SolicitacodigoPage]
})
export class SolicitacodigoPageModule {}
