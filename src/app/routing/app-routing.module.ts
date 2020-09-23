import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreloadingHelper} from '../helper';
import {AuthGuard} from '../guard';
import {GuestWelcomeComponent} from '../module/guest';
import {PageNotFoundComponent} from '../module/share';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'src/app/module/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: '',
    component: GuestWelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      preloadingStrategy: PreloadingHelper
    })
  ],
  exports: [RouterModule],
  providers: [PreloadingHelper]
})
export class AppRoutingModule {
}
