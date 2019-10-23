import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AlbumsComponent } from './albums.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AlbumsComponent, children: [
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {
}
