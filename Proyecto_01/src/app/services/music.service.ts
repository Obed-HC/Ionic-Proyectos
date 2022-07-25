import { Injectable } from '@angular/core';
import * as dataArtists from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  header = {'Access-Control-Request-Headers': '*'};
  url_server = "https://music-back-seminario.herokuapp.com/";

  constructor() { }

  getArtists(){
    return fetch(`${this.url_server}artists`, { mode: 'cors' , headers: this.header}).then(
      (response) => response.json()
    );
  }

  getArtistsFromJson(){
    return dataArtists;
    
  }

  getAlbums() {
    return fetch(`${this.url_server}albums`, { mode: 'cors' , headers: this.header} ).then(
      (albums) => albums.json()
    );
  }

  getArtistTracks(artist_id) {
    return fetch(`${this.url_server}tracks/artist/${artist_id}`, { mode: 'cors' , headers: this.header} ).then(
      (albums) => albums.json()
    );
  }

  /*================================ Tarea viernes 15-07-2022 ================================ */
  getAlbumTracks(album_id) {
    return fetch(`${this.url_server}tracks/album/${album_id}`, { mode: 'cors' , headers: this.header} ).then(
      (albums) => albums.json()
    );
  }

}
