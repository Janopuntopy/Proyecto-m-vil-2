import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarfotoPageRoutingModule } from './tomarfoto-routing.module';

import { TomarfotoPage } from './tomarfoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarfotoPageRoutingModule
  ],
  declarations: [TomarfotoPage]
})
export class TomarfotoPageModule {}
