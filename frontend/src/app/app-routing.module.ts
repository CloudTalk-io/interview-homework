// frontend/src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ShipmentsListComponent } from './pages/shipments-list/shipments-list.component';

const routes: Routes = [
  { path: 'items', component: ItemsListComponent },
  { path: 'shipments', component: ShipmentsListComponent }, // Add route for ShipmentsListComponent// Add route for ShipmentsListComponent
  { path: '', redirectTo: '/items', pathMatch: 'full' }, // Redirect to items list by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
