import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  usuario : any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router)
  
  {
    this.activatedRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
        console.log(this.usuario);
      }
    })
  }

}
