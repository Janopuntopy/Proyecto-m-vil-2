import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule,
            FormsModule,
            IonicModule,
            HomePageRoutingModule]
})
export class HomePageModule {}
