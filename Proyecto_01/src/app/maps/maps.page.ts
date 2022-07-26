import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center = {
    lat: -12.082119,
    lng: -76.928483
  }

  markerId;
  coordinates: any[] = [];

  /*
    lat: -12.053676,
    lng: -75.230870
     */
  constructor() { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    await this.getCurrentPosition();
    this.watchPosition();
  }

  async createMap(){
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApiKey,
      config: {
        center: this.center,
        zoom: 12,
      }
    });
    //this.newMap.enableCurrentLocation(true); //Funcionalidad para que ubique la cámara en tu ubicación
    this.addMarker(this.center.lat, this.center.lng);
    this.addListeners();
    // this.newMap.enableTrafficLayer(true); // para mostrar que calles están más concurridas (tráfico)
    // this.newMap.setMapType(MapType.Hybrid); // muestra el tipo de mapa que queremos
  }

  async getCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
    this.createMap();
  }

  async addMarker(lat, lng){
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      draggable: true,
      opacity: 1,
      iconUrl: 'assets/images/nota-musical.png' ,
    })
  }

  watchPosition(){
    Geolocation.watchPosition({}, position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      //console.log(this.center);
      this.setCamera(position.coords.latitude, position.coords.longitude);
      this.coordinates.push({coordinate: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
    });
  }

  setCamera(lat, lng){
    this.removeMarker();
    this.addMarker(lat, lng);
    this.newMap.setCamera({
      coordinate: {
        lat:lat,
        lng:lng
      },
      //animate: true,
      //animationDuration: 100,
    });
  }

  async removeMarker(id?){
    await this.newMap.removeMarker(id ? id : this.markerId); // IF TERNARIO: si se le envía id como parametro entonces usará id, caso contrario usara this.markerId
  }

  async addListeners(){
    await this.newMap.setOnMarkerClickListener((event) =>{
      //console.log("Click en el marcador", event);
      this.removeMarker(event.markerId);
    });

    await this.newMap.setOnMapClickListener((event) =>{
      //console.log("Click en el mapa", event);
      this.addMarker(event.latitude, event.longitude);
    });
  }

  async showCoordsHistory(){
    // // console.log(this.coordinates);
    // this.coordinates.forEach(coord => {
    //   this.addMarker(coord.lat, coord.lng);
    // });

    await this.newMap.addMarkers(this.coordinates);
  }

}
