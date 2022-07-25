import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsModalPage } from './albums-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsModalPageRoutingModule {}
