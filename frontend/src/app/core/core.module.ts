import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
