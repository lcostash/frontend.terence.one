import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminContainerComponent, AdminDashboardComponent, AdminMessagesComponent} from '../module/admin';
import {AuthGuard} from '../guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        children: [
          {
            path: 'messages',
            component: AdminMessagesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '',
            redirectTo: 'messages'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
