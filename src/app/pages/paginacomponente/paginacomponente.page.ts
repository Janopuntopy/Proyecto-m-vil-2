import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginacomponente',
  templateUrl: './paginacomponente.page.html',
  styleUrls: ['./paginacomponente.page.scss'],
  standalone: false,
})
export class PaginacomponentePage implements OnInit {

  constructor(private router: Router  ) { }

  ngOnInit() {
  }
  segmentChanged($event : any){
    console.log($event)
    let direccion = $event.detail.value
    console.log(direccion)
    this.router.navigate(['pageconcomponentes/'+direccion])
  }

}
