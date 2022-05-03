import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PaginationComponent } from './pagination/pagination.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';



@NgModule({
  declarations: [
    PagetitleComponent,
    // PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PagetitleComponent,
    // PaginationComponent
  ]
})
export class SharedModule { }
