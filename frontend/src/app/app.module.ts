import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesTabsComponent } from './core/components/pages-tabs/pages-tabs.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, OverlayModule, PagesTabsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
