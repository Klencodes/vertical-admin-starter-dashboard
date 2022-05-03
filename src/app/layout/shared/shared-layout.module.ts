import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { TranslateModule } from '@ngx-translate/core';

import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { HorizontalnavbarComponent } from './horizontalnavbar/horizontalnavbar.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    RightsidebarComponent,
    HorizontalnavbarComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    NgbDropdownModule,
    ClickOutsideModule,
    RouterModule,
  ],
  exports: [
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    RightsidebarComponent,
    HorizontalnavbarComponent,

  ],
  providers: [],
})
export class SharedLayoutModule {}