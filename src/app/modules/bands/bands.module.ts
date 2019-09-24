import { NgModule } from "@angular/core";

import { BandsRoutingModule } from "./bands-routing.module";
import { SharedModule } from '../../shared.module';
import { BandsComponent } from './bands.component';

@NgModule({
  declarations: [
    BandsComponent
  ],
  imports: [
    BandsRoutingModule,
    SharedModule
  ],
  providers: []
})
export class BandsModule {
}
