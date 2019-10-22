import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: []
})
export class AuthModule {
}
