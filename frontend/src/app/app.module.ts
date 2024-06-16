import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ShipmentsListComponent } from './pages/shipments-list/shipments-list.component';
import { ListItemComponent } from './pages/items-list/list-item/list-item.component';
import { ShipmentFormComponent } from './pages/shipment-form/shipment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WarehouseStatusComponent } from './pages/warehouse-status/warehouse-status.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ShipmentsListComponent,
    ShipmentFormComponent,
    WarehouseStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListItemComponent,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

