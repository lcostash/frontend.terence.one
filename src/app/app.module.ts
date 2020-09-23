import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './routing';
import {AppComponent} from './app.component';
import {AuthGuard, GuestGuard} from './guard';
import {AuthService, ShareService} from './service';
import {ErrorInterceptor, TokenInterceptor} from './interceptor';
import {GuestModule, ShareModule} from './module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
      enableHtml: true,
      timeOut: 5000
    }),
    GuestModule,
    ShareModule
  ],
  providers: [
    AuthGuard,
    GuestGuard,
    AuthService,
    ShareService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
