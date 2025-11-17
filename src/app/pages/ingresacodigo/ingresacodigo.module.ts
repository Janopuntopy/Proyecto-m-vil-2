import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresacodigoPageRoutingModule } from './ingresacodigo-routing.module';

import { IngresacodigoPage } from './ingresacodigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresacodigoPageRoutingModule
  ],
  declarations: [IngresacodigoPage]
})
export class IngresacodigoPageModule {}
