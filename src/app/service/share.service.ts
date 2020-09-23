import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AjaxResponseInterface, ConfirmButtonInterface} from '../interface';
import {AjaxActionEnum} from '../enum';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class ShareService {
  public ToastrSubject = new Subject<AjaxResponseInterface>();

  /**
   * @param httpClient HttpClient
   */
  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * @since 0.0.1
   * @return string
   */
  public static uuid(): string {
    const u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    return [
      u.substr(0, 8),
      u.substr(8, 4),
      '4000-8' + u.substr(13, 3),
      u.substr(16, 12),
    ].join('-');
  }

  /**
   * @since 0.0.1
   * @return Array<ConfirmButtonInterface>
   */
  public getConfirmButtons(): Array<ConfirmButtonInterface> {
    const buttons: Array<ConfirmButtonInterface> = [];
    buttons.push({
      text: 'Cancel',
      class: 'btn-secondary', position: 1, callback: false
    });
    buttons.push({
      text: 'Delete',
      class: 'btn-danger', position: 2, callback: true
    });
    return buttons;
  }

  /**
   * @since 0.0.1
   * @param route string
   * @param action AjaxActionEnum
   * @param data any
   * @return Observable<AjaxResponseInterface>
   */
  public doAction(route: string, action: AjaxActionEnum, data?: any): Observable<AjaxResponseInterface> {
    let url = `${environment.app.ajax.url}/${route}`;
    let http: Observable<any>;

    if (action === AjaxActionEnum.View) {
      if (typeof data !== 'undefined' && typeof data.id !== 'undefined') {
        url += `/${data.id}`;
      }
      http = this.httpClient.get(url);
    }

    if (action === AjaxActionEnum.Add) {
      http = this.httpClient.post(url, data);
    }

    if (action === AjaxActionEnum.Edit) {
      http = this.httpClient.put(url, data);
    }

    if (action === AjaxActionEnum.Delete) {
      if (typeof data !== 'undefined' && typeof data.id !== 'undefined') {
        url += `/${data.id}`;
      }
      http = this.httpClient.delete(url);
    }

    return http.pipe(
      tap((result: AjaxResponseInterface) => {
        return result;
      }, (error: AjaxResponseInterface) => {
        return error;
      })
    );
  }
}
