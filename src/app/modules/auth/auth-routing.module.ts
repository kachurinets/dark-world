import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AuthComponent, children: [],

      },
      {
        path: 'login', component: LoginComponent, children: []
      },
      {
        path: 'signup', component: SignupComponent, children: []
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
