import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { vehiculosService } from '../services/vehiculos.service';
import { documentosService } from '../services/documentos.service';


@Component({
  selector: 'app-documentos-vehiculo',
  templateUrl: './documentos-vehiculo.component.html',
  styleUrls: ['./documentos-vehiculo.component.css'],
  providers: [vehiculosService, documentosService]
})
export class DocumentosVehiculoComponent implements OnInit {
  data: any;
  constructor(private _vehiculoService: vehiculosService, private _documentoService: documentosService, private _router:Router, private route: ActivatedRoute) { 
    this._documentoService.Download('').subscribe(
      
    )
  }


  ngOnInit(): void {
  }
  getVehiculo(vehiculo: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        result: JSON.stringify(vehiculo)
      }
    }
    this._router.navigate(['asignar_documentos'], navigationExtras);
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
