import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiCheckboxModule, SuiModule } from 'ng2-semantic-ui';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
