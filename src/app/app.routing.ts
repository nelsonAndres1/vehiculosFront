import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";
import { Clase_vehiculoComponent } from "./clase_vehiculo/clase_vehiculo.component";
import { HomeComponent } from "./home/home.component";
import { IdentityGuard } from "./services/identity.guard";
import { LoginGuard } from "./services/login.guard";
import { TipoDocumentoComponent } from "./tipo-documento/tipo-documento.component";
import { DocumentosVehiculoComponent } from "./documentos-vehiculo/documentos-vehiculo.component";
import { AsignarDocumentosComponent } from "./asignar-documentos/asignar-documentos.component";
const appRoutes: Routes = [
    {path: '', component: LoginComponent, canActivate:[LoginGuard]},
    {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
    {path: 'logout/:sure', component:LoginComponent, canActivate: [IdentityGuard]},
    {path: 'clase_vehiculo', component: Clase_vehiculoComponent , canActivate: [IdentityGuard]},
    {path: 'tipo_documento', component: TipoDocumentoComponent , canActivate: [IdentityGuard]},
    {path: 'vehiculos', component: VehiculosComponent , canActivate: [IdentityGuard]},
    {path: 'documentos_vehiculo', component: DocumentosVehiculoComponent , canActivate: [IdentityGuard]},
    {path: 'home', component: HomeComponent, canActivate: [IdentityGuard]},
    {path: 'asignar_documentos', component: AsignarDocumentosComponent, canActivate: [IdentityGuard]},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] =[]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)