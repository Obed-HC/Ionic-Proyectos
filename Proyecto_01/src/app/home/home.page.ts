import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { AlbumsModalPage } from '../albums-modal/albums-modal.page';
import { SearchModalPage } from '../search-modal/search-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  artists: any;
  artistsFromJson: any;
  albums:any;
  currentSong: HTMLAudioElement;
  newTime;

  slideOps = {
    initialSlide: 1,
    slidesPerView: 3,
    centeredSlides: true,
    speed: 400
  }

  song = {
    playing: false,
    name: '',
    preview_url: ''
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
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
    
  }

  /*================================ Tarea viernes 15-07-2022 ================================ */
  async showAlbums(album) {
    const items = await this.musicService.getAlbumTracks(album.id);
    const modal = await this.modalController.create({
      component: AlbumsModalPage,
      componentProps: {
        items: items,
        album: album.name
      }
    });
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
    
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url)
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = ( 1 / this.currentSong.duration) * this.currentSong.currentTime;
    });
    this.song.playing = true;
  }
  
  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time : any = "0.00"){
    if(time){
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if(minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if(seconds.length ==1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;

    }
  }

  async openSearchModal(){

    /*================================ Tarea jueves 21-07-2022 ================================ */
    
    const modal = await this.modalController.create({
      component: SearchModalPage
    });
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

}
