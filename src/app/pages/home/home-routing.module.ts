import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { Componente1Component } from 'src/app/components/componente1/componente1.component';
import { Componente2Component } from 'src/app/components/componentes.component';
import { Componente3Component } from 'src/app/components/componente3/componente3.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'uno',
        component: Componente1Component
      },
      {
        path: 'dos',
        component: Componente2Component
      },
      {
        path: 'tres',
        component: Componente3Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
