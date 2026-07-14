import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbar: SnackbarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.snackbar.error('Invalid request.');
            break;

          case 401:
            this.snackbar.error('Unauthorized.');
            break;

          case 403:
            this.snackbar.error('Access denied.');
            break;

          case 404:
            this.snackbar.error('Resource not found.');
            break;

          case 409:
            this.snackbar.error('Duplicate record.');
            break;

          case 500:
            this.snackbar.error('Internal server error.');
            break;

          case 0:
            this.snackbar.error('Unable to connect to server.');
            break;

          default:
            this.snackbar.error('Something went wrong.');
            break;
        }

        return throwError(() => error);
      }),
    );
  }
}
