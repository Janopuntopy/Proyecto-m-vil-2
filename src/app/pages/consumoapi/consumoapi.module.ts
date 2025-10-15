import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumoapiPageRoutingModule } from './consumoapi-routing.module';

import { ConsumoapiPage } from './consumoapi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumoapiPageRoutingModule
  ],
  declarations: [ConsumoapiPage]
})
export class ConsumoapiPageModule {}
