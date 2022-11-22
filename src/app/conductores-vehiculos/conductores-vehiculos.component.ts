import { Component, OnInit } from '@angular/core';
import { Conductores } from '../models/conductores';
import { Gener02Service } from '../services/gener02.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { clase_vehiculoService } from '../services/clase_vehiculo.service';
import { conductoresService } from '../services/conductores.service';
import { licenciasService } from '../services/licencias.service';
import { Licencias } from '../models/licencias';
import { vehiculosService } from '../services/vehiculos.service';
import { Vehiculos } from '../models/vehiculos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductores-vehiculos',
  templateUrl: './conductores-vehiculos.component.html',
  styleUrls: ['./conductores-vehiculos.component.css'],
  providers: [Gener02Service, clase_vehiculoService, conductoresService, licenciasService, vehiculosService]
})
export class ConductoresVehiculosComponent implements OnInit {

  public identity: any;
  filterPost = '';
  public vehiculos2: Vehiculos;
  public vehiculos:any;
  clase_vehiculos: any = [];
  conductores: Conductores;
  datos_licencias: Licencias;
  datos: any;
  conductores_res:any = [];
  licencias: any = [];
  lista_licencias: any = [];
  constructor(private _conductoresService: conductoresService,private _vehiculoService: vehiculosService,private _licenciasService: licenciasService, private route: ActivatedRoute, private _gener02Service: Gener02Service, private _router: Router, private _route: ActivatedRoute) { 
    this.identity = JSON.parse(localStorage.getItem('identity') + '');    
    this.conductores = new Conductores('', '', '', '', '', '', '', this.identity.sub);
    this.datos_licencias = new Licencias('','');
    this.vehiculos2 = new Vehiculos(0, '', '', '', '', 0, '', this.identity.sub);
    this._conductoresService.getConductores(this.conductores).subscribe(
      response =>{
        this.conductores_res = response;
      }
    )

    this._conductoresService.getLicencias(this.conductores).subscribe(
      response =>{
        console.log("response");
        this.licencias =response;
      }
    )

    this.getVehiculos();
  }

  ngOnInit(): void {
  }
  onSubmit(form){


  }


  getVehiculos() {
    this._vehiculoService.getVehiculos(this.vehiculos2).subscribe(
      response => {
        console.log("respiuesta");
        console.log(response);
        this.vehiculos = response;
      }
    )
  }


}
