import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Gener02Service } from '../services/gener02.service';
import { Gener02 } from '../models/gener02';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
/* import { Tipo_vehiculo } from '../models/tipo_vehiculo'; */
import { Vehiculos } from '../models/vehiculos';
import { vehiculosService } from '../services/vehiculos.service';
import { clase_vehiculoService } from '../services/clase_vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  providers: [Gener02Service, clase_vehiculoService, vehiculosService]
})

export class VehiculosComponent implements OnInit {
  public vehiculos: Vehiculos;
  public vehiculos2: Vehiculos;
  public identity: any;
  filterPost = '';
  clase_vehiculos: any = [];
  public status: any;
  public tokenConsultado: any;
  public identityConsultado: any;
  constructor(private _clase_vehiculoService: clase_vehiculoService, private _vehiculoService: vehiculosService, private _gener02Service: Gener02Service, private _router: Router, private _route: ActivatedRoute) {
    this.identity = JSON.parse(localStorage.getItem('identity') + '');
    this.vehiculos = new Vehiculos(0, '', '', '', '', 0, '', this.identity.sub);
    this.vehiculos2 = new Vehiculos(0, '', '', '', '', 0, '', this.identity.sub);


    this.getVehiculos();
    this.getTipo_vehiculos();
  }

  ngOnInit(): void { }
  opcion2() {
    this._router.navigate(['opcion2']);
  }
  onSubmit(form) {
    Swal.fire({
      title: '¿Estas seguro de guardar?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("prueba!");
        console.log(this.vehiculos);
        this._vehiculoService.register(this.vehiculos).subscribe(
          response => {
            if (response.status != 'error') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Datos Guardados!',
                showConfirmButton: false,
                timer: 1500
              })
              form.reset();
              this.getVehiculos();
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: '¡Datos No Guardados!',
                showConfirmButton: false,
                timer: 1500
              });
            }
          }, error=>{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: '¡Datos No Guardados!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }
    });
  }
  getVehiculos() {
    this._vehiculoService.getVehiculos(this.vehiculos).subscribe(
      response => {
        console.log("respiuesta");
        console.log(response);
        this.vehiculos2 = response;
      }
    )
  }
  getTipo_vehiculos() {
    this._clase_vehiculoService.getTipo_vehiculos(this.vehiculos).subscribe(
      response => {
        console.log("respiuesta");
        console.log(response);
        this.clase_vehiculos = response;
      }
    )
  }
}
