import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {ChartModule} from 'primeng/chart';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    SharedModule
  ]
})
export class DashboardModule { }
