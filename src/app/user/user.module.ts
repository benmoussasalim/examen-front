import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import { CandidatComponent } from './candidat/candidat.component';
import {UserRoutingModule} from "./user-routing.module";
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    CandidatComponent,
    EntrepriseComponent,
    ChangePasswordComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
