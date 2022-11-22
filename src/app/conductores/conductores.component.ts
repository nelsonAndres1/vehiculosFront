import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Gener02Service } from '../services/gener02.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Conductores } from '../models/conductores';
import { conductoresService } from '../services/conductores.service';
@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css'],
  providers: [Gener02Service, conductoresService]
})
export class ConductoresComponent implements OnInit {

  public identity: any;
  filterPost = '';
  clase_vehiculos: any = [];
  conductores: Conductores;
  datos: any;
  conductores_res:any = [];
  tipo_sexo = [{ "value": "M", "detalle": "MASCULINO" }, { "value": "F", "detalle": "FEMENINO" }, { "value": "I", "detalle": "INDETERMINADO" }];

  constructor(private _conductoresService: conductoresService, private route: ActivatedRoute, private _gener02Service: Gener02Service, private _router: Router, private _route: ActivatedRoute) {

    this.identity = JSON.parse(localStorage.getItem('identity') + '');    
    this.conductores = new Conductores('', '', '', '', '', '', '', this.identity.sub);


    this._conductoresService.getConductores(this.conductores).subscribe(
      response =>{
        console.log("response!");
        console.log(response);
        this.conductores_res = response;
      }
    )
    
  }

  ngOnInit(): void {
  }
  onSubmit(form) {

    console.log("formulario");
    console.log(this.conductores)

    this._conductoresService.register(this.conductores).subscribe(
      response=>{
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos guardados! <br>',
          showConfirmButton: false,
          timer: 2500
        })
        this.conductores = new Conductores('', '', '', '', '', '', '', this.identity.sub);
        form.reset();
      },error=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Datos NO guardados! <br>'+'<h4>'+ error.error.message+'</h4>',
          showConfirmButton: false,
          timer: 5000
        })
        this.conductores = new Conductores('', '', '', '', '', '', '', this.identity.sub);
        form.reset();
      }
      
    )
    

  }
}
