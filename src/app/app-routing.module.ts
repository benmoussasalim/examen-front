import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {__importStar} from "tslib";
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/app', pathMatch: 'full'},
  {
    path: 'app', canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layouts/layouts.module').then(m => m.LayoutsModule)
  },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
