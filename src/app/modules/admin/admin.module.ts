import { NgModule } from "@angular/core";
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  providers: []
})
export class AdminModule {
}
