import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuiModule, SuiSelectModule } from 'ng2-semantic-ui';
import { NgxGalleryModule } from 'ngx-gallery';

import { BandCardComponent } from './components/band-card/band-card.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FilterComponent } from './components/filter/filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


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
    SuiModule,
    NgxGalleryModule,
    CKEditorModule,

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
    NgxGalleryModule,
    CKEditorModule,
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SharedModule {

}
