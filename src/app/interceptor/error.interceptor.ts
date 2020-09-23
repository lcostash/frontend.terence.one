import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../service';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly modalService: BsModalService,
    @Inject(DOCUMENT) private document: Document) {
  }

  /**
   * @param request HttpRequest<any>
   * @param next HttpHandler
   * @return Observable<HttpEvent<any>>
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((event: any) => {
        const title: string = event.status + ' ' + event.statusText;
        const message: string = event.error.message || event.message;
        let fm: any;

        if (event.status === 401) {
          for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
            this.modalService.hide(i);
          }
          this.authService.signOut();
          this.authService.AuthSubject.next();
          this.document.body.classList.remove('modal-open');
          fm = event.error;
        }
        if (event.status === 400) {
          fm = event.error;
        }
        this.toastrService.error(message, title);

        return throwError(fm ? fm : message);
      })
    );
  }
}
