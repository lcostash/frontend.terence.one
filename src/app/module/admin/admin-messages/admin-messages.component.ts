import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AdminService, ShareService} from '../../../service';
import {ActionInterface, AjaxResponseInterface, MessageInterface} from '../../../interface';
import {AjaxActionEnum} from '../../../enum';
import {environment} from '../../../../environments/environment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ConfirmComponent} from '../../share/confirm';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public dateTime: string = environment.app.format.dateTime;
  public search = '';
  public rows: Array<MessageInterface> = [];
  public action: ActionInterface = {isBusy: false, isRefresh: false};

  /**
   * @param adminService AdminService
   * @param shareService ShareService
   * @param toastrService ToastrService
   * @param modalService BsModalService
   */
  constructor(
    private adminService: AdminService,
    private shareService: ShareService,
    private toastrService: ToastrService,
    private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getMessages();
  }

  /**
   * @since 0.0.1
   * @return void
   */
  public getMessages(): void {
    this.action.isBusy = true;
    this.shareService.doAction('api/messages', AjaxActionEnum.View).subscribe(
      (response: AjaxResponseInterface) => {
        this.rows = (response.rows ? response.rows : []) as Array<MessageInterface>;
        this.action.isBusy = false;
      }, () => {
        this.rows = [];
        this.action.isBusy = false;
      }
    );
  }

  /**
   * @since 0.0.1
   * @return void
   */
  public addMessage(): void {
    this.toastrService.info('Sorry, this functionality will be implemented in next version.', 'Coming soon');
    return;
  }

  /**
   * @since 0.0.1
   * @param id number
   * @return void
   */
  public editMessage(id: number): void {
    this.toastrService.info('Sorry, this functionality will be implemented in next version.', 'Coming soon');
  }

  /**
   * @since 0.0.1
   * @param identify number
   * @return void
   */
  public deleteMessage(identify: number): void {
    this.bsModalRef = this.modalService.show(ConfirmComponent, {
      initialState: {
        option: {
          message: 'Are you sure?',
          actions: this.shareService.getConfirmButtons()
        }
      },
      ignoreBackdropClick: true,
      class: 'modal-sm'
    });

    const subscription = this.bsModalRef.content.chosen.subscribe((action: any) => {
      if (action) {
        this.toastrService.info('Sorry, this functionality will be implemented in next version.', 'Coming soon');
      }
      subscription.unsubscribe();
    });
  }
}
