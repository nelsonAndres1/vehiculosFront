import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Gener02Service } from '../services/gener02.service';
import { Gener02 } from '../models/gener02';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Tipo_vehiculo } from '../models/tipo_vehiculo';
import { clase_vehiculoService } from '../services/clase_vehiculo.service';
@Component({ selector: 'app-claseVehiculo', templateUrl: './clase_vehiculo.component.html', styleUrls: ['./clase_vehiculo.component.scss'], providers: [Gener02Service, clase_vehiculoService] })
export class Clase_vehiculoComponent implements OnInit {

    public tipo_vehiculo: Tipo_vehiculo;
    public identity: any;
    filterPost = '';
    clase_vehiculos:any = [];
    constructor(private _clase_vehiculoService: clase_vehiculoService, private _gener02Service: Gener02Service, private _router: Router, private _route: ActivatedRoute) {
        this.identity = JSON.parse(localStorage.getItem('identity') + '');
        this.tipo_vehiculo = new Tipo_vehiculo(0, '', this.identity.sub);
        this.getTipo_vehiculos();
    }
    public status: any;
    public tokenConsultado: any;
    public identityConsultado: any;
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
                this._clase_vehiculoService.register(this.tipo_vehiculo).subscribe(
                    response =>{
                        if(response.status != 'error'){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: '¡Datos Guardados!',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              form.reset();
                              this.getTipo_vehiculos();
                        }else{
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: '¡Datos No Guardados!',
                                showConfirmButton: false,
                                timer: 1500
                              })
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
                console.log(this.tipo_vehiculo);
            }
        });
    }
    getTipo_vehiculos(){
        this._clase_vehiculoService.getTipo_vehiculos(this.tipo_vehiculo).subscribe(
            response=>{
                console.log("respiuesta");
                console.log(response);
                this.clase_vehiculos= response;
            }
        )
    }
}
