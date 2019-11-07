import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared.module';
import { GeneralConfigComponent } from './general-config/general-config.component';

@NgModule({
  declarations: [
    AdminComponent,
    GeneralConfigComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  providers: []
})
export class AdminModule {
}
