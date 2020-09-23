import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {
  SignInInterface,
  AuthInterface,
  AuthResponseInterface,
  AjaxResponseInterface,
  AjaxStoreInterface
} from '../interface';
import {AjaxActionEnum, UserPathEnum, UserRoleEnum} from '../enum';
import {ShareService} from './share.service';

@Injectable()
export class AuthService {
  public AuthSubject = new Subject();
  private auth: AuthInterface;

  /**
   * @param httpClient HttpClient
   * @param shareService ShareService
   */
  constructor(
    private httpClient: HttpClient,
    private shareService: ShareService) {
  }

  /**
   * @since 0.0.1
   * @return AjaxStoreInterface
   */
  public static getStore(): AjaxStoreInterface {
    let ajaxStore: AjaxStoreInterface = {token: '', settings: ''};
    if (localStorage.getItem(environment.app.store)) {
      ajaxStore = JSON.parse(atob(localStorage.getItem(environment.app.store)));
    }
    return ajaxStore;
  }

  /**
   * @since 0.0.1
   * @param ajaxStore AjaxStoreInterface
   * @return void
   */
  public static setStore(ajaxStore: AjaxStoreInterface): void {
    if (ajaxStore) {
      localStorage.setItem(environment.app.store, btoa(JSON.stringify(ajaxStore)));
    }
  }

  /**
   * @since 0.0.1
   * @return AuthInterface
   */
  private static initAuth(): AuthInterface {
    return {
      uuid: '',
      firstName: '',
      lastName: '',
      role: UserRoleEnum.Guest,
      path: UserPathEnum.Guest,
      isLogged: false
    };
  }

  /**
   * @since 0.0.1
   * @param response AuthResponseInterface
   */
  private setAuthData(response: AuthResponseInterface): Promise<any> {
    return new Promise(resolve => {
      if (response) {
        const ajaxStore: AjaxStoreInterface = {token: '', settings: ''};
        if (response.token) {
          ajaxStore.token = response.token;
        }
        if (response.profile) {
          this.auth = AuthService.initAuth();
          this.auth.uuid = response.profile.uuid;
          this.auth.firstName = response.profile.firstName;
          this.auth.lastName = response.profile.lastName;
          this.auth.isLogged = true;
          if (response.profile.role === UserRoleEnum.Admin) {
            this.auth.role = UserRoleEnum.Admin;
            this.auth.path = UserPathEnum.Admin;
          }
          if (response.profile.role === UserRoleEnum.Guest) {
            this.auth.role = UserRoleEnum.Guest;
            this.auth.path = UserPathEnum.Guest;
          }
        }
        if (response.settings) {
          ajaxStore.settings = response.settings;
        }
        AuthService.setStore(ajaxStore);
      }
      resolve();
    });
  }

  /**
   * @since 0.0.1
   * @method get
   * @return AuthInterface
   */
  public get getAuth(): AuthInterface {
    return this.auth ? this.auth : AuthService.initAuth();
  }

  /**
   * @since 0.0.1
   * @param data SignInInterface
   * @return Promise<AjaxResponseInterface>
   */
  public signIn(data: SignInInterface): Promise<AjaxResponseInterface> {
    return new Promise((resolve, reject) => {
      this.shareService.doAction('auth/sign-in', AjaxActionEnum.Add, data).subscribe(
        async (response: AuthResponseInterface) => {
          await this.setAuthData(response);
          resolve(response);
        }, () => reject());
    });
  }

  /**
   * @since 0.0.1
   * @return Promise<AjaxResponseInterface>
   */
  public checkMe(): Promise<AjaxResponseInterface> {
    return new Promise((resolve, reject) => {
      this.shareService.doAction('api/auth/me', AjaxActionEnum.View).subscribe(
        async (response: AuthResponseInterface) => {
          await this.setAuthData(response);
          resolve(response);
        }, () => reject());
    });
  }

  /**
   * @since 0.0.1
   * @return void
   */
  public signOut(): void {
    localStorage.removeItem(environment.app.store);
    this.auth = AuthService.initAuth();
  }
}
