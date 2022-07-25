import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userImage = "assets/images/profile.png";
  photo: SafeResourceUrl;

  constructor( private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async takePhoto(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, //es decir lo convierte a un string data url -> facil acceso
      //resultType: CameraResultType.Base64, //es decir lo convierte a un string en base 64
      //resultType: CameraResultType.Uri, // te devuelve el link donde esta la foto
      //source: CameraSource.Camera //abre la cámara del celular
      source: CameraSource.Photos // abre el explorador de archivos para elegir una imagen
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl( //le dara confianza a nuestro resource url
      image && image.dataUrl
    ); 
    console.log(image);
  }

}
