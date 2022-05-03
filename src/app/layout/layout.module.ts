import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { SharedModule } from '../pages/shared/shared.module';
import { SharedLayoutModule } from './shared/shared-layout.module';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedLayoutModule,
    SharedModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
  ]
})
export class LayoutModule { }
