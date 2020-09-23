import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AuthService, CheckService, ShareService} from '../../../service';
import {
  ActionInterface,
  AjaxResponseInterface,
  FieldMessageInterface,
  SignInInterface
} from '../../../interface';

@Component({
  selector: 'app-guest-auth',
  templateUrl: './guest-auth.component.html',
  styleUrls: ['./guest-auth.component.scss']
})
export class GuestAuthComponent implements OnInit {
  public signInForm: FormGroup;
  public action: ActionInterface = {isBusy: false};

  /**
   * @param bsModalRef BsModalRef
   * @param authService AuthService
   * @param shareService ShareService
   */
  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        CheckService.emailValidator,
        Validators.minLength(2),
        Validators.maxLength(190)
      ]),
      password: new FormControl(null, [
        Validators.required,
        CheckService.passwordValidator,
        Validators.minLength(8),
        Validators.maxLength(100)
      ])
    });
  }

  /**
   * @since 0.0.1
   * @param event Event
   * @return void
   */
  public onSignInSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.signInForm.valid) {
      const data = this.signInForm.value as SignInInterface;
      this.action.isBusy = true;

      this.authService.signIn(data).then(
        (response: AjaxResponseInterface) => {
          this.bsModalRef.hide();
          this.authService.AuthSubject.next();
          this.shareService.ToastrSubject.next(response);
          this.action.isBusy = false;
        },
        (error: AjaxResponseInterface) => {
          if (error && error.status === 400) {
            error.fm.forEach((fm: FieldMessageInterface) => {
              if (this.signInForm.controls[fm.id]) {
                this.signInForm.controls[fm.id].setErrors({beError: fm.message});
              }
            });
          }
          this.shareService.ToastrSubject.next(error);
          this.action.isBusy = false;
        }
      ).catch();
    }
  }
}
