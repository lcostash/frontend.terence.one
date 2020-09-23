import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../service';
import {AuthInterface} from '../../../interface';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AboutAppComponent} from '../about-app';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  public version: string = environment.app.version;
  public auth: AuthInterface;
  public bsModalRef: BsModalRef;
  private readonly authSubscription: Subscription;

  /**
   * @param authService AuthService
   * @param modalService BsModalService
   */
  constructor(
    private authService: AuthService,
    private modalService: BsModalService) {
    this.authSubscription = this.authService.AuthSubject.subscribe(() => {
      this.auth = this.authService.getAuth;
    });
  }

  ngOnInit(): void {
    this.auth = this.authService.getAuth;
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * @since 0.0.1
   * @return void
   */
  public aboutApp(): void {
    this.bsModalRef = this.modalService.show(AboutAppComponent, {
      ignoreBackdropClick: true,
      class: 'modal-sm'
    });
  }
}
