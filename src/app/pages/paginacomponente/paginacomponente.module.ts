import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginacomponentePageRoutingModule } from './paginacomponente-routing.module';

import { PaginacomponentePage } from './paginacomponente.page';
import { Componente2Component } from 'src/app/components/componente2/componente2.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginacomponentePageRoutingModule
  ],
  declarations: [PaginacomponentePage,Componente2Component]
})
export class PaginacomponentePageModule {}
