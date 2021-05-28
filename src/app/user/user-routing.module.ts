import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CandidatComponent} from "./candidat/candidat.component";
import {EntrepriseComponent} from "./entreprise/entreprise.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {AdminGuard} from "../shared/guards/admin.guard";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: 'candidat', component: CandidatComponent, canActivate: [AdminGuard]},
  {path: 'entreprise', component: EntrepriseComponent , canActivate: [AdminGuard]},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'profile', component: ProfileComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {

}
