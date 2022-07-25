import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-albums-modal',
  templateUrl: './albums-modal.page.html',
  styleUrls: ['./albums-modal.page.scss'],
})
export class AlbumsModalPage implements OnInit {

  /*================================ Tarea viernes 15-07-2022 ================================ */

  album: string;
  items: any;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.album = this.navParams.data.album;
    this.items = this.navParams.data.items;
  }

  closeModal(){
    this.modalController.dismiss();
  }

  async selectSong(item) {
    await this.modalController.dismiss(item)
  }

}
