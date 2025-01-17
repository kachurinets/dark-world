import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
                this.isLoading = false;
            }
        );
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.login(form.value.email, form.value.password);
    }

    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}
