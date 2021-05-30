import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationService, MessageService} from "primeng/api";
import { ThemeComponent } from './settings/theme/theme.component';
import {DatePipe, registerLocaleData} from "@angular/common";
import {JwtInterceptorService} from "./shared/services/jwt-interceptor.service";
import {NgxPermissionsModule} from "ngx-permissions";
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [MessageService, ConfirmationService,DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    { provide: LOCALE_ID, useValue: "fr" }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
