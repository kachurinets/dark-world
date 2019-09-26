import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BandsComponent } from './bands.component';
import { BandComponent } from './band/band.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: BandsComponent, children: [
        ]
      },
      {
        path: 'band/:id', component: BandComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class BandsRoutingModule {
}
