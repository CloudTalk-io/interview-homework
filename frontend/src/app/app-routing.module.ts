import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ShipmentsListComponent } from './pages/shipments-list/shipments-list.component';
import { ShipmentFormComponent } from './pages/shipment-form/shipment-form.component';

const routes: Routes = [
  {
    path: 'products',
    component: ItemsListComponent,
  },
  {
    path: 'shipments',
    component: ShipmentsListComponent,
  },
  {
    path: 'shipments/create',
    component: ShipmentFormComponent,
  },
  {
    path: 'shipments/:id',
    component: ShipmentFormComponent,
  },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
