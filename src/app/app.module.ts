import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiCheckboxModule, SuiModule } from 'ng2-semantic-ui';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    SuiCheckboxModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
