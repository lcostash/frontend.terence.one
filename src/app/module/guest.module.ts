import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ModalModule, BsModalService} from 'ngx-bootstrap/modal';

import {ShareModule} from './share.module';
import {GuestAuthComponent} from './guest/guest-auth';
import {GuestWelcomeComponent} from './guest/guest-welcome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ShareModule
  ],
  declarations: [
    GuestAuthComponent,
    GuestWelcomeComponent
  ],
  entryComponents: [],
  providers: [
    BsModalService
  ]
})
export class GuestModule {
}
