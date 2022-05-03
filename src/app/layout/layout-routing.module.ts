import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [

  { path: '', component: LayoutComponent, children: [

    { path: '', component: DashboardComponent },
    { path: 'products', loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsModule) }
    
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
