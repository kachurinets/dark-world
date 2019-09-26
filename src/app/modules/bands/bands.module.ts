import { NgModule } from "@angular/core";

import { BandsRoutingModule } from "./bands-routing.module";
import { SharedModule } from '../../shared.module';
import { BandsComponent } from './bands.component';
import { BandComponent } from './band/band.component';

@NgModule({
  declarations: [
    BandsComponent,
    BandComponent
  ],
  imports: [
    BandsRoutingModule,
    SharedModule
  ],
  providers: []
})
export class BandsModule {
}
