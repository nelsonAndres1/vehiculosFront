import { NgModule } from '@angular/core';
import { routing,appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { Clase_vehiculoComponent } from './clase_vehiculo/clase_vehiculo.component';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import { IdentityGuard } from "./services/identity.guard";
import { LoginGuard } from './services/login.guard';


// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';

import { FilterPipe } from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HomeComponent } from './home/home.component';
import { Gener02Service } from './services/gener02.service';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { DocumentosVehiculoComponent } from './documentos-vehiculo/documentos-vehiculo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    Clase_vehiculoComponent,
    FilterPipe,
    HomeComponent,
    VehiculosComponent,
    TipoDocumentoComponent,
    DocumentosVehiculoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BoldReportViewerModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatCheckboxModule
  ],
  providers: [
    IdentityGuard,
    Gener02Service,
    LoginGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
