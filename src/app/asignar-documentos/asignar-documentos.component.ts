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
  selector: 'app-asignar-documentos',
  templateUrl: './asignar-documentos.component.html',
  styleUrls: ['./asignar-documentos.component.css'],
  providers: [Tipo_documentoService, documentosService]
})
export class AsignarDocumentosComponent implements OnInit {

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

  datos: any;
  constructor(private _tipo_documentoService: Tipo_documentoService, private route: ActivatedRoute, public formBuilder: FormBuilder, private _documentosService: documentosService) {

    this.identity = JSON.parse(localStorage.getItem('identity') + '');
    this.route.queryParams.subscribe(response => {

      this.datos = JSON.parse(response['result']);
      this.documentosCF = new Documentos('', '', '', this.datos.id, '', this.identity.sub, '');
      this.documentosSF = new Documentos('', '', '', this.datos.id, '', this.identity.sub, '');
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
  onSubmit(form) {
    console.log("datos******************");
    console.log(this.documentosCF);
    this._documentosService.register(this.documentosCF).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos guardados!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(response);
        this.submitted = true;
        const formData = new FormData();
        formData.append("image", this.files, this.files.name);
        formData.append("iddoc", this.files, response.id);
        console.log(formData);
        this._documentosService.uploadData(formData).subscribe(
          res => {
            this.data = res;
            console.log(this.data);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Soporte Guardado!',
              showConfirmButton: false,
              timer: 1500
            })
          }, error => {
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Soporte NO guardado!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }, error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Datos NO guardados!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }






  onSubmitSF(form) {
    console.log("datos******************");
    console.log(this.documentosSF);
    this._documentosService.register(this.documentosSF).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos guardados!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(response);
        this.submitted = true;
        const formData = new FormData();
        formData.append("image", this.files, this.files.name);
        formData.append("iddoc", this.files, response.id);
        console.log(formData);
        this._documentosService.uploadData(formData).subscribe(
          res => {
            this.data = res;
            console.log(this.data);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Soporte Guardado!',
              showConfirmButton: false,
              timer: 1500
            })
          }, error => {
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Soporte NO guardado!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }, error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Datos NO guardados!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

  uploadImage(event) {
    this.files = event.target.files[0];

    console.log(this.files);
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
