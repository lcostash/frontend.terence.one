import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class PreloadingHelper implements PreloadingStrategy {
  /**
   * @param route Route
   * @param load Function
   * @return Observable<any>
   */
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return (route.data && route.data.preload) ? load() : of(null);
  }
}
