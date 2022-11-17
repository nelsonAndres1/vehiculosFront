import { Component, OnInit } from '@angular/core';
import { Documentos } from '../models/documentos';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { Tipo_documentoService } from '../services/tipo_documento.service';
import { FileUploader } from 'ng2-file-upload';
import { global } from '../services/global';
import { Validator } from '@angular/forms';
import { documentosService } from '../services/documentos.service';


const MURL: string = global.url + "documentos/save";
@Component({
  selector: 'app-consulta-vehiculo',
  templateUrl: './consulta-vehiculo.component.html',
  styleUrls: ['./consulta-vehiculo.component.css'],
  providers: [Tipo_documentoService, documentosService]
})
export class ConsultaVehiculoComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: MURL, itemAlias: 'archivo' });
  documentosCF: Documentos;
  documentosSF: Documentos;

  tipdoc: any;
  tipo_documentos: any = [];
  tipo_documento: any = [];

  docConFecha: any = [];
  docSinFecha: any = [];
  files: any;
  submitted = false;
  form!: FormGroup;
  data: any;
  identity: any;

  res_doc: any = [];
  filterPost = '';


  datos: any;
  constructor(private _tipo_documentoService: Tipo_documentoService, private route: ActivatedRoute, public formBuilder: FormBuilder, private _documentosService: documentosService) {

    this.identity = JSON.parse(localStorage.getItem('identity') + '');
    this.route.queryParams.subscribe(response => {

      

      this.datos = JSON.parse(response['result']);
      console.log("datos!");
      console.log(this.datos);
      
      this.documentosCF = new Documentos('', '', '', this.datos.id, '', this.identity.sub, '');
      this.documentosSF = new Documentos('', '', '', this.datos.id, '', this.identity.sub, '');

      this._documentosService.getDocumentos(this.documentosCF).subscribe(
        response => {
          console.log("respuesta documentos");
          console.log(response);
          this.res_doc = response;
        }
      )


    })

    this.documentosCF = new Documentos('', '', '', this.datos.id, '', this.identity.sub, '');
    this.documentosSF = new Documentos('', '', '', this.datos.id, '', this.identity.sub, '');
    this.getTipo_documento();



  }
  createForm() {

    this.form = new FormGroup(
      {
        'image': new FormControl('', [Validators.required])
      }
    )
  }
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.createForm();
  }


  uploadImage(event) {
    this.files = event.target.files[0];

    console.log(this.files);
  }
  vencido(datos) {
    if (datos.vencido) {
      Swal.fire({
        icon: 'error',
        title: 'Información',
        text: '¡Documento Vencido!',
        footer: datos.dias + ' dia(s) de vencido'
      })
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Documento Vigente.',
        footer: 'faltan ' + datos.dias + ' dia(s) para vencerse'
      })
    }
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
