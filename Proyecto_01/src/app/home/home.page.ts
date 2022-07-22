import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists: any;
  artistsFromJson: any;
  albums:any;

  slideOps = {
    initialSlide: 1,
    slidesPerView: 3,
    centeredSlides: true,
    speed: 400
  }


  constructor(private musicService: MusicService,
              private modalController: ModalController){}

  ionViewDidEnter(){
    //lista de artistas por api generica
    this.musicService.getArtists().then(listArtists=>{
      this.artists = listArtists;
      //console.log(listArtist);
    });
    //lista de artistas desde apijson
    this.artistsFromJson = this.musicService.getArtistsFromJson();
    console.log(this.artistsFromJson.artists);

    //albums desde api
    this.musicService.getAlbums().then(listAlbums => {
      this.albums = listAlbums;
    })

  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
        artist: artist.name
      }
    });
    modal.present();
    
  }

}
