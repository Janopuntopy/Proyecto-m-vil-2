import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoencontradoPageRoutingModule } from './noencontrado-routing.module';

import { NoencontradoPage } from './noencontrado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoencontradoPageRoutingModule
  ],
  declarations: [NoencontradoPage]
})
export class NoencontradoPageModule {}
