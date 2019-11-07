import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { GeneralConfigComponent } from './general-config/general-config.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'create', component: AdminComponent,
      },
      {
        path: 'edit/:bandId', component: AdminComponent,
      },
      {
        path: 'general-config', component: GeneralConfigComponent,
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
