import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Apiservice } from './services/apiservice';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Drivers } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            IonicStorageModule.forRoot({
            name: 'mydb',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
            HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, 
                useClass: IonicRouteStrategy }, 
                SQLite, Apiservice,Camera],
  bootstrap: [AppComponent],
})
export class AppModule {}
