import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedDirectivesModule } from 'src/app/core/directives/shared-directives-module';
import { SharedPipesModule } from 'src/app/core/pipes/shared-pipes-module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SharedPipesModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedDirectivesModule,
    SharedModule
  ]
})
export class ProductsModule { }
