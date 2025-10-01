import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperapassPageRoutingModule } from './recuperapass-routing.module';

import { RecuperapassPage } from './recuperapass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperapassPageRoutingModule
  ],
  declarations: [RecuperapassPage]
})
export class RecuperapassPageModule {}
