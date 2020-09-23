import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ModalModule, BsModalService} from 'ngx-bootstrap/modal';

import {ShareModule} from './share.module';
import {AdminRoutingModule} from '../routing';
import {AdminContainerComponent} from './admin/admin-container';
import {AdminDashboardComponent} from './admin/admin-dashboard';
import {AdminMessagesComponent} from './admin/admin-messages';
import {AdminService} from '../service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    AdminRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AdminContainerComponent,
    AdminDashboardComponent,
    AdminMessagesComponent
  ],
  entryComponents: [],
  providers: [
    BsModalService,
    AdminService
  ]
})
export class AdminModule {
}
