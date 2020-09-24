import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ModalModule, BsModalService} from 'ngx-bootstrap/modal';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';

import {ShareModule} from './share.module';
import {GuestAuthComponent} from './guest/guest-auth';
import {GuestMessageComponent} from './guest/guest-message';
import {GuestWelcomeComponent} from './guest/guest-welcome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ShareModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    GuestAuthComponent,
    GuestMessageComponent,
    GuestWelcomeComponent
  ],
  entryComponents: [],
  providers: [
    BsModalService
  ]
})
export class GuestModule {
}
