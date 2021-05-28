import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutsRoutingModule} from './layouts-routing.module';
import {BlankComponent} from './blank/blank.component';
import {FullComponent} from './full/full.component';
import {NavigationComponent} from './header-navigation/navigation.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [BlankComponent,
    FullComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    PerfectScrollbarModule,
    NgbModule,
    SharedModule
]
})
export class LayoutsModule {
}
