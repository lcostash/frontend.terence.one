import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service';
import {ActionInterface, AuthInterface} from '../../../interface';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AjaxActionEnum} from "../../../enum";
import {GuestMessageComponent} from "../guest-message";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-guest-welcome',
  templateUrl: './guest-welcome.component.html',
  styleUrls: ['./guest-welcome.component.scss']
})
export class GuestWelcomeComponent implements OnInit {
  public auth: AuthInterface;
  public bsModalRef: BsModalRef;
  public action: ActionInterface = {isInit: false, isBusy: false, isRefresh: false};
  private busySubscription: Subscription;

  /**
   * @param authService AuthService
   * @param modalService BsModalService
   */
  constructor(
    private authService: AuthService,
    private modalService: BsModalService) {
    this.auth = this.authService.getAuth;
  }

  ngOnInit(): void {
    this.busySubscription = GuestMessageComponent.isBusy.subscribe((status: boolean) => {
      this.action.isBusy = status;
    });
  }

  ngOnDestroy(): void {
    if (this.busySubscription) {
      this.busySubscription.unsubscribe();
    }
  }

  /**
   * @since 0.0.1
   * @return void
   */
  public addMessage(): void {
    this.action.isBusy = true;
    this.bsModalRef = this.modalService.show(GuestMessageComponent, {
      initialState: {
        operation: AjaxActionEnum.Add,
        identify: 0
      },
      ignoreBackdropClick: true
    });
  }
}
