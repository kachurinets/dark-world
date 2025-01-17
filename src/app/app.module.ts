import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiCheckboxModule, SuiModule } from 'ng2-semantic-ui';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './modules/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ConfirmModalComponent } from './components/error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ConfirmModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SuiModule,
        SuiCheckboxModule,
        HttpClientModule,

    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],
    entryComponents: [ConfirmModalComponent]
})
export class AppModule {
}
