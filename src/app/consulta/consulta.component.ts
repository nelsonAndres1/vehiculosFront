import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { vehiculosService } from '../services/vehiculos.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [vehiculosService]
})
export class ConsultaComponent implements OnInit {

  data: any;
  constructor(private _vehiculoService: vehiculosService, private _router:Router, private route: ActivatedRoute) { 
  
  }


  ngOnInit(): void {
  }
  getVehiculo(vehiculo: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        result: JSON.stringify(vehiculo)
      }
    }
    this._router.navigate(['consulta_vehiculo'], navigationExtras);
  }
  searchVehiculos(pclave: any) {
    const keyword = pclave.target.value;
    console.log("keyword");
    console.log(keyword);
    const search = this._vehiculoService.searchVehiculo(keyword).then(response => {
      this.data = response;
      console.log(this.data);
    });
  }

}
