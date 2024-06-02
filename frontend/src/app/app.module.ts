import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ShipmentsListComponent } from './pages/shipments-list/shipments-list.component';
import { ListItemComponent } from './pages/items-list/list-item/list-item.component';
import { ShipmentFormComponent } from './pages/shipment-form/shipment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ShipmentsListComponent,
    ShipmentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListItemComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
