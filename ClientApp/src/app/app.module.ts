import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import * as Sentry from '@sentry/browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { HomeComponent } from './component/home/home.component';
import { CounterComponent } from './component/counter/counter.component';
import { FetchDataComponent } from './component/fetch-data/fetch-data.component';
import { VehicleFormComponent } from './component/vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './component/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './component/shared/pagination.component';
import { ViewVehicleComponent } from './component/view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { ProgressService } from './services/progress.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './component/admin/admin.component';
import { ChartModule } from 'angular2-chartjs';
import { JwtInterceptor } from './JwtInterceptor';

Sentry.init({
  dsn: 'https://69f4aa7c218444f28a9cd41c9b989301@sentry.io/1292606'
});

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ChartModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuardService] },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuardService] },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuardService ] },
      { path: 'home', component: HomeComponent},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService,
    HttpClient,
    AuthGuardService,
    AdminAuthGuardService,
    VehicleService,
    PhotoService,
    ProgressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
