import {Component} from '@angular/core';
import {AuthService} from './service';
import {AjaxStoreInterface} from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * @param authService AuthService
   */
  constructor(private authService: AuthService) {
    // check if token is valid
    const ajaxStore: AjaxStoreInterface = AuthService.getStore();
    if (ajaxStore && ajaxStore.token.length !== 0) {
      this.authService.checkMe().then(() => this.authService.AuthSubject.next()).catch();
    }
  }
}
