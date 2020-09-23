import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service';
import {AuthInterface} from '../interface';

@Injectable()
export class GuestGuard implements CanLoad, CanActivate {
  /**
   * @param router Router
   * @param authService AuthService
   */
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  /**
   * @param route Route
   * @return boolean
   */
  public canLoad(route: Route): boolean {
    const auth: AuthInterface = this.authService.getAuth;
    if (!auth.isLogged) {
      return true;
    }

    this.router.navigate(['/']).then();
    return false;
  }

  /**
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @return boolean
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const auth: AuthInterface = this.authService.getAuth;
    if (!auth.isLogged) {
      return true;
    }

    this.router.navigate(['/']).then();
    return false;
  }
}
