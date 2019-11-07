import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModalSize, SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from './components/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    modalSize: ModalSize = 'mini';
    constructor(public modalService: SuiModalService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "An unknown error occured";
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.modalService.open(new ConfirmModal('Error!', error.error.error.message, this.modalSize));
                return throwError(error);
            })
        );
    }
}
