import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'create', component: AdminComponent,
      },
      {
        path: 'edit/:bandId', component: AdminComponent,
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
