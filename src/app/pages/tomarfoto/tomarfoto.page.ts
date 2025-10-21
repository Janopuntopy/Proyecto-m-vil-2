import { Component, OnInit } from '@angular/core';
import { Cameraservice } from 'src/app/services/cameraservice';

@Component({
  selector: 'app-tomarfoto',
  templateUrl: './tomarfoto.page.html',
  styleUrls: ['./tomarfoto.page.scss'],
  standalone: false,
})
export class TomarfotoPage implements OnInit {
  capturaImagen: String | undefined;

  constructor(private cameraservices: Cameraservice) { }

  ngOnInit() {
  }

  async takeFoto(){
    const image = await this.cameraservices.tomarFoto();
    if (image){
      this.capturaImagen = image;
    }
  }

}
