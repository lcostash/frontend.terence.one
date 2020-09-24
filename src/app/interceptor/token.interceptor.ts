import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AjaxStoreInterface} from '../interface';
import {AuthService} from '../service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  /**
   * @param request HttpRequest<any>
   * @param next HttpHandler
   * @return Observable<HttpEvent<any>>
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ajaxStore: AjaxStoreInterface = AuthService.getStore();
    const headers: any = [];
    headers['Content-Type'] = 'application/json';
    headers['Content-Language'] = 'en';
    if (ajaxStore && ajaxStore.token.length !== 0) {
      headers['Authorization'] = `Bearer ${ajaxStore.token}`;
    }
    if (!environment.app.ajax.cache) {
      headers['Cache-Control'] = 'no-cache';
      headers.Pragma = 'no-cache';
      headers.Expires = '-1';
    }
    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }
}
