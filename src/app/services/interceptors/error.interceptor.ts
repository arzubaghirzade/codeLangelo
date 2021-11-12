import { AppService } from '../app/app.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private appService: AppService, private router: Router,
    private modal: NzModalService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
            if ((evt.status == 200 || evt.status == 201) && (request.method != 'GET')) {
          this.modal.success({
            nzTitle: 'Uğurlu əməliyyat',
            nzContent: 'Əməliyyat uğurla başa çatmışdır'
          });
          }
        }
      }),
      catchError((err: any) => {        
        if (err instanceof HttpErrorResponse) {
          try {
            if (err.status == 422) {
            this.modal.warning({
              nzTitle: 'Uğursuz əməliyyat',
              nzContent: 'Xəta baş verdi'
            });
            } else if (err.status == 401) {
              this.modal.warning({
                nzTitle: 'Uğursuz əməliyyat',
                nzContent: 'Xəta baş verdi'
              });
            }
            else {
              this.modal.warning({
                nzTitle: 'Uğursuz əməliyyat',
                nzContent: 'Xəta baş verdi'
              });
            }
          } catch (e) {
            const error = err.error.message || err.statusText;
            return throwError(error);
          }
        }
        return of(err);
      })
    );
  }
}
