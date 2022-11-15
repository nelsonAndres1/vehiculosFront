import { Component, OnInit } from '@angular/core';
import { Documentos } from '../models/documentos';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { Tipo_documentoService } from '../services/tipo_documento.service';
@Component({
  selector: 'app-asignar-documentos',
  templateUrl: './asignar-documentos.component.html',
  styleUrls: ['./asignar-documentos.component.css'],
  providers: [Tipo_documentoService]
})
export class AsignarDocumentosComponent implements OnInit {

  documentosCF: Documentos;
  documentosSF: Documentos;
  tipdoc: any;
  tipo_documentos: any = [];
  tipo_documento: any = [];

  docConFecha: any = [];
  docSinFecha: any = [];

  constructor(private _tipo_documentoService: Tipo_documentoService) {
    this.documentosCF = new Documentos('', '', '', '', '', '', '');
    this.documentosSF = new Documentos('', '', '', '', '', '', '');
    this.getTipo_documento();
  }

  ngOnInit(): void {
  }
  onSubmit(form) {
    console.log("documentos");
    console.log(form.value);
  }
  getTipo_documento() {
    this._tipo_documentoService.getTipo_documento(this.documentosCF).subscribe(
      response => {
        console.log("respiuesta");
        console.log(response);
        this.tipo_documentos = response;

        for (let index = 0; index < this.tipo_documentos.length; index++) {
          if (this.tipo_documentos[index].banfec == 'true') {
            this.docConFecha.push(this.tipo_documentos[index]);
          } else {
            this.docSinFecha.push(this.tipo_documentos[index]);
          }
        }
        console.log(this.docConFecha);
        console.log(this.docSinFecha);
      }

    )
  }

}
