import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { SuiModule, SuiSelectModule } from 'ng2-semantic-ui';
import { BandCardComponent } from './components/band-card/band-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    FilterComponent,
    BandCardComponent,
    PaginationComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiSelectModule,
    SuiModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterComponent,
    SuiSelectModule,
    SuiModule,
    BandCardComponent,
    PaginationComponent,
    CommentsComponent,
  ],

  providers: [

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SharedModule {

}
