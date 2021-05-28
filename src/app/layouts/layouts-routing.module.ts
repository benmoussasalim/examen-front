import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullComponent} from './full/full.component';
import {AdminGuard} from "../shared/guards/admin.guard";


const routes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'settings', canActivate: [AdminGuard],
        loadChildren: () =>
          import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'features',
        loadChildren: () =>
          import('../features/features.module').then(m => m.FeaturesModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
