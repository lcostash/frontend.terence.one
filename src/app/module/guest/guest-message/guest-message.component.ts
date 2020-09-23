import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ActionInterface, AjaxResponseInterface, FieldMessageInterface, MessageInterface} from '../../../interface';
import {AuthService, CheckService, ShareService} from '../../../service';
import {AjaxActionEnum} from "../../../enum";

@Component({
  selector: 'app-guest-message',
  templateUrl: './guest-message.component.html',
  styleUrls: ['./guest-message.component.scss']
})
export class GuestMessageComponent implements OnInit, OnDestroy {
  public static isBusy: EventEmitter<boolean> = new EventEmitter();
  public action: ActionInterface = {isInit: false, isBusy: false};
  public form: FormGroup;
  public operation: AjaxActionEnum;
  public identify: number;
  private row: MessageInterface;

  /**
   * @param bsModalRef BsModalRef
   * @param authService AuthService
   * @param shareService ShareService
   */
  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private shareService: ShareService) {
    this.action.isInit = true;
  }

  ngOnInit(): void {
    this.initForm();
    this.initRow().then((message: MessageInterface) => {
      this.row = message;
      if (this.row === null) {
        this.bsModalRef.hide();
      } else {
        this.form.controls.id.setValue(this.row.id);
        this.form.controls.name.setValue(this.row.name);
        this.form.controls.email.setValue(this.row.email);
        this.form.controls.message.setValue(this.row.message);
        this.form.controls.subscribed.setValue(this.row.subscribed);
        if (this.operation === AjaxActionEnum.Edit) {
          this.form.controls.id.markAsTouched();
          this.form.controls.name.markAsTouched();
          this.form.controls.email.markAsTouched();
          this.form.controls.message.markAsTouched();
          this.form.controls.subscribed.markAsTouched();
        }
      }
    }).finally(() => {
      this.action.isInit = false;
    });
  }

  ngOnDestroy(): void {
    GuestMessageComponent.isBusy.emit(false);
  }

  /**
   * @since 0.0.1
   * @return Promise<MessageInterface|null>
   */
  private initRow(): Promise<MessageInterface | null> {
    return new Promise<any>((resolve, reject) => {
      const row: MessageInterface = {
        id: 0,
        name: null,
        email: null,
        message: null,
        subscribed: false
      };

      if (this.operation === AjaxActionEnum.Add) {
        resolve(row);
      }
      if (this.operation === AjaxActionEnum.Edit) {
        const data = {id: this.identify};
        this.shareService.doAction('api/message', AjaxActionEnum.View, data).subscribe(
          (result: AjaxResponseInterface) => resolve((result.row ? result.row : {}) as MessageInterface),
          () => reject(null)
        );
      }
    });
  }

  /**
   * @since 0.0.1
   * @return void
   */
  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(0, []),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        CheckService.emailValidator
      ]),
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        CheckService.stringValidator
      ]),
      subscribed: new FormControl(null, [])
    });
  }

  /**
   * @since 0.0.1
   * @param event Event
   * @return void
   */
  public onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.valid) {
      const data = Object.assign({}, this.form.value) as MessageInterface;

      this.action.isBusy = true;
      this.shareService.doAction('api/message', this.operation, data).subscribe(
        (response: AjaxResponseInterface) => {
          this.bsModalRef.hide();
          this.shareService.ToastrSubject.next(response);
          this.action.isBusy = false;
        },
        (error: AjaxResponseInterface) => {
          if (error && error.status === 400) {
            error.fm.forEach((fm: FieldMessageInterface) => {
              if (this.form.controls[fm.id]) {
                this.form.controls[fm.id].setErrors({beError: fm.message});
              }
            });
          }
          this.shareService.ToastrSubject.next(error);
          this.action.isBusy = false;
        }
      );
    }
  }
}
