import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeComponent} from './theme/theme.component';
import {SharedModule} from "../shared/shared.module";
import {SettingsRoutingModule} from "./settings-routing.module";


@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ]
})

export class SettingsModule {
}
