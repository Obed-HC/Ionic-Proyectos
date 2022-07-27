import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  slideOpt = {
    initialSlide: 0, //slide inicial
    slidesPerView: 1, //slide por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de casa slide en milisegundo
  }

  slides = [
    {
      tittle: "Artistas",
      subtittle: "Los mejores artistas del momento",
      icon: "people-outline",  /* https://ionic.io/ionicons/v2 */
      img: "https://cdn.pixabay.com/photo/2013/07/13/13/17/karaoke-160752_960_720.png",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      tittle: "Play List",
      subtittle: "Guarda tus canciones favoritas",
      icon: "play-outline",
      img: "https://cdn.pixabay.com/photo/2016/11/19/00/12/wave-1837426_960_720.png",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      tittle: "Clasificación",
      subtittle: "Clasifica tus canciones más escuchadas",
      icon: "musical-note-outline",
      img: "https://cdn.pixabay.com/photo/2018/09/08/11/09/jazz-3662296_960_720.png",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      tittle: "Comenta",
      subtittle: "Envía comentarios sobre las canciones",
      icon: "chatbox-ellipses-outline",
      img: "https://cdn.pixabay.com/photo/2017/02/25/23/51/abstract-2099064_960_720.png",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]
  constructor( private router : Router, private storage: Storage) {
    this.storage.create();
   }

   ngOnInit() : void{
   }
   
  finish(){
    this.storage.set("isIntroShowed", true);
    this.router.navigateByUrl("/login");
  }
}
