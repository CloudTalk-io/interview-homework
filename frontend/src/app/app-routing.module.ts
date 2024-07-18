import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemsListComponent} from './pages/items-list/items-list.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsListComponent
  },
  { path: '**',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
