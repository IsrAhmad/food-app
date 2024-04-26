import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
// import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
