import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {KeyFilterModule} from "primeng/keyfilter";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {NgxPermissionsModule} from "ngx-permissions";
import {CarouselModule} from "primeng/carousel";
import {AutosizeModule} from "ngx-autosize";
import {RadioButtonModule} from "primeng/radiobutton";
import {CheckboxModule} from "primeng/checkbox";
import {CountdownGlobalConfig, CountdownModule} from "ngx-countdown";
import {NgxPrintModule} from "ngx-print";


function countdownConfigFactory(): CountdownGlobalConfig {
  // @ts-ignore
  return { format: 'HH:mm:ss' };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild()

  ], exports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    KeyFilterModule,
    TableModule,
    DialogModule,
    ConfirmPopupModule,
    InputSwitchModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    NgxPermissionsModule,
    CarouselModule,
    AutosizeModule,
    RadioButtonModule,
    CheckboxModule,
    CountdownModule,
    NgxPrintModule
  ], providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ]
})
export class SharedModule { }
