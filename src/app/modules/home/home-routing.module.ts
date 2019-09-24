import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: HomeComponent, children: [
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
