import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Tipo_Documento } from '../models/tipo_documento';
import { Tipo_documentoService } from '../services/tipo_documento.service';
@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss'],
  providers: [Tipo_documentoService]
})
export class TipoDocumentoComponent implements OnInit {

  public tipo_documento: Tipo_Documento;
  public identity: any;
  filterPost = '';
  tipo_documentos: any = [];
  public status: any;
  public tokenConsultado: any;
  public identityConsultado: any;
  constructor(private _tipo_documentoService: Tipo_documentoService, private _router: Router, private _route: ActivatedRoute) {
    this.identity = JSON.parse(localStorage.getItem('identity') + '');
    this.tipo_documento = new Tipo_Documento(0, '', this.identity.sub);
    this.getTipo_documento();
  }

  ngOnInit(): void {
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
        console.log("tipo de documento");
        console.log(this.tipo_documento);
        this._tipo_documentoService.register(this.tipo_documento).subscribe(
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
              this.getTipo_documento();
            } else {
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
      }
    });
  }

  getTipo_documento() {
    this._tipo_documentoService.getTipo_documento(this.tipo_documento).subscribe(
      response => {
        console.log("respiuesta");
        console.log(response);
        this.tipo_documentos = response; 
/*         this.clase_vehiculos = response; */
      }
    )
  }

}
