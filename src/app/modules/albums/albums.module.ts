import { NgModule } from "@angular/core";


import { SharedModule } from '../../shared.module';
import { AlbumsComponent } from './albums.component';
import { AlbumsRoutingModule } from './albums-routing.module';


@NgModule({
  declarations: [
    AlbumsComponent
  ],
  imports: [
    AlbumsRoutingModule,
    SharedModule
  ],
  providers: []
})
export class AlbumsModule {
}
