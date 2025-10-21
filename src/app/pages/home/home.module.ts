import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Componente1Component } from 'src/app/components/componente1/componente1.component';
import { Componente2Component } from 'src/app/components/componente2/componente2.component';
import { Componente3Component } from 'src/app/components/componente3.component';



@NgModule({
  declarations: [HomePage,Componente1Component, Componente2Component, Componente3Component],
  imports: [CommonModule,
            FormsModule,
            IonicModule,
            HomePageRoutingModule]
})
export class HomePageModule {}
