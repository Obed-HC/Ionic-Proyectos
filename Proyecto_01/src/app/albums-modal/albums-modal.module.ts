import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumsModalPageRoutingModule } from './albums-modal-routing.module';

import { AlbumsModalPage } from './albums-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumsModalPageRoutingModule
  ],
  declarations: [AlbumsModalPage]
})
export class AlbumsModalPageModule {}
