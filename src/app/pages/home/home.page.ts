import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  constructor( private router : Router) {}

  ngOnInit() {
    
  }

  segmentChanged($event : any){
    console.log($event)
    let direccion = $event.detail.value
    console.log(direccion)
    this.router.navigate(['home/'+direccion])
  }

}
