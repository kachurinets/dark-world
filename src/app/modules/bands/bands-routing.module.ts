import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BandsComponent } from './bands.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: BandsComponent, children: [
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class BandsRoutingModule {
}
