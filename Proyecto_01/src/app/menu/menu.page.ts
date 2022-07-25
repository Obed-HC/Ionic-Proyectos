import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor( private menu:MenuController,
                private navCtrl:NavController,
                private storage:Storage) { 
                  
                  this.storage.create();
                }

  ngOnInit() {
  }

  closeMenu(){
    this.menu.close();
  }

  logout(){
    this.storage.set("isUserLoggedIn", false);
    this.navCtrl.navigateRoot('/login');
  }

  goToHome(){
    this.navCtrl.navigateRoot('menu');
    this.menu.close();
  }

  goToSettings(){
    this.navCtrl.navigateRoot('menu/settings');
    this.menu.close();
  }

  goToMaps(){
    this.navCtrl.navigateRoot('menu/maps');
    this.menu.close();
  }

}
