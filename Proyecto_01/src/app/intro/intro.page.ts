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
      tittle: "Titulo 1",
      subtittle: "Sub tittle 1",
      icon: "ion-headphone",  /* https://ionic.io/ionicons/v2 */
      img: "assets/images/slide1.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      tittle: "Titulo 2",
      subtittle: "Sub tittle 2",
      icon: "musical-note-outline",
      img: "assets/images/slide2.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      tittle: "Titulo 3",
      subtittle: "Sub tittle 3",
      icon: "play-outline",
      img: "assets/images/slide3.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      tittle: "Titulo 4",
      subtittle: "Sub tittle 4",
      icon: "ion-ipod",
      img: "assets/images/slide4.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]
  constructor( private router : Router, private storage: Storage) {
    this.storage.create();
   }

   ngOnInit() : void{
    this.showe().then( x=>{
      if(x){
        this.router.navigateByUrl("/home")
      }
    })
    
   }
   async showe(){
    const show = await this.storage.get("isIntroShowed")
    return show
   }

  finish(){
    this.storage.set("isIntroShowed", true);
    this.router.navigateByUrl("/home");
  }
}
