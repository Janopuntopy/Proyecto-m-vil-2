import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class Cameraservice {

  constructor (private camera: Camera){}

  async tomarFoto(): Promise<String | null> {
    const formato: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    try {
      const imagen = await this.camera.getPicture(formato);
      return 'data:image/jpeg;base64,' + imagen;
    }catch (error) {
      console.error('Error al tomar la foto', error);
      return null;
    }
  }
  
}
