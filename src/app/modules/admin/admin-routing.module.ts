import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AdminComponent, children: [
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
