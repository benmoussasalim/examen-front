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
  ]
})
export class SharedModule { }
