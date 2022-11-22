import { Component, OnInit } from '@angular/core';
import { Conductores } from '../models/conductores';
import { Gener02Service } from '../services/gener02.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { clase_vehiculoService } from '../services/clase_vehiculo.service';
import { conductoresService } from '../services/conductores.service';
import { licenciasService } from '../services/licencias.service';
import { Licencias } from '../models/licencias';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-licencias-conductores',
  templateUrl: './licencias-conductores.component.html',
  styleUrls: ['./licencias-conductores.component.css'],
  providers: [Gener02Service, clase_vehiculoService, conductoresService, licenciasService]
})
export class LicenciasConductoresComponent implements OnInit {

  public identity: any;
  filterPost = '';
  clase_vehiculos: any = [];
  conductores: Conductores;
  datos_licencias: Licencias;
  datos: any;
  conductores_res:any = [];
  licencias: any = [];
  lista_licencias: any = [];
  constructor(private _conductoresService: conductoresService,private _licenciasService: licenciasService, private route: ActivatedRoute, private _gener02Service: Gener02Service, private _router: Router, private _route: ActivatedRoute) { 
    this.identity = JSON.parse(localStorage.getItem('identity') + '');    
    this.conductores = new Conductores('', '', '', '', '', '', '', this.identity.sub);
    this.datos_licencias = new Licencias('','');

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
  }

  ngOnInit(): void {
  }
  onSubmit(form){

    if(this.lista_licencias.length>0){

      for (let index = 0; index < this.lista_licencias.length; index++) {
        this._licenciasService.register(new Licencias(this.conductores.cedula,this.lista_licencias[index])).subscribe(
          response=>{
            if(response.status == 'success'){
              console.log("respuesta!");
              console.log(response);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 5000
              })
            }else if(response.status == 'error'){
              console.log("respuesta!");
              console.log(response);
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: response.message,
                showConfirmButton: false,
                timer: 5000
              })
            }

          }
        )
      }


    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No ha seleccionado licencias!',
        showConfirmButton: false,
        timer: 5000
      })

    }
  }
  cambio(seleccion:any){
    var bandera = false;
    var index_lista = 0;
    if(this.lista_licencias.length>0){
      for (let index = 0; index < this.lista_licencias.length; index++) {
          if(this.lista_licencias[index] == seleccion.tiplic){
            bandera = true;
            index_lista = index;
          }        
      }
      if(bandera){
        this.lista_licencias.splice(index_lista,1);
      }else{
        this.lista_licencias.push(seleccion.tiplic);   
      }

    }else{
      this.lista_licencias.push(seleccion.tiplic);
    }
    console.log(this.lista_licencias);
  }

}
