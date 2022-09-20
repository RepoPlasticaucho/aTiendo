import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AtributosEntity } from 'src/app/models/atributos';
import { ColorsEntity } from 'src/app/models/colors';
import { GenerosEntity } from 'src/app/models/generos';
import { LineasEntity } from 'src/app/models/lineas';
import { MarcasEntity } from 'src/app/models/marcas';
import { ModelosEntity } from 'src/app/models/modelos';
import { AtributosService } from 'src/app/services/atributos.service';
import { ColoresService } from 'src/app/services/colores.service';
import { GenerosService } from 'src/app/services/generos.service';
import { LineasService } from 'src/app/services/lineas.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ModeloproductosService } from 'src/app/services/modeloproductos.service';
import { ModelosService } from 'src/app/services/modelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modeloproductos-create',
  templateUrl: './modeloproductos-create.component.html',
  styleUrls: ['./modeloproductos-create.component.css'],
})
export class ModeloproductosCreateComponent implements OnInit {
  //Iconos para la pagina de grupos
  faList = faList;
  faTimes = faTimes;
  faSave = faSave;
  //Creación de la variable para formulario
  modelProductForm = new FormGroup({
    marca_id: new FormControl('0', Validators.required),
    modelo_id: new FormControl('0', Validators.required),
    color_id: new FormControl('0', Validators.required),
    atributo_id: new FormControl('0', Validators.required),
    genero_id: new FormControl('0', Validators.required),
    modeloProducto: new FormControl('', [Validators.required]),
    etiquetas: new FormControl('', Validators.required),
    codigoSAP: new FormControl('', [Validators.required]),
  });
  //Variables para listas desplegables
  lstMarcas: MarcasEntity[] = [];
  lstModelos: ModelosEntity[] = [];
  lstColores: ColorsEntity[] = [];
  lstAtributos: AtributosEntity[] = [];
  lstGeneros: GenerosEntity[] = [];
  //Variables para validar selección
  selectMarcas: boolean = false;
  selectModelos: boolean = false;
  selectColores: boolean = false;
  selectAtributos: boolean = false;
  selectGeneros: boolean = false;
  //Variables para Autocomplete
  keywordMark = 'marca';
  keywordModel = 'modelo';
  keywordColor = 'color';
  keywordAttribute = 'atributo';
  keywordGenre = 'genero';

  constructor(
    private readonly httpServiceMarcas: MarcasService,
    private readonly httpServiceModelos: ModelosService,
    private readonly httpServiceColores: ColoresService,
    private readonly httpServiceAtributos: AtributosService,
    private readonly httpServiceGeneros: GenerosService,
    private readonly httpService: ModeloproductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Obtenemos Marcas
    this.httpServiceMarcas.obtenerMarcas().subscribe((res) => {
      if (res.codigoError != 'OK') {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Marcas.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        console.log(res.lstMarcas);
        this.lstMarcas = res.lstMarcas;
      }
    });
    //Obtenemos Modelos
    this.httpServiceModelos.obtenerModelos().subscribe((res) => {
      if (res.codigoError != 'OK') {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Modelos.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        console.log(res.lstModelos);
        this.lstModelos = res.lstModelos;
      }
    });
    //Obtenemos Colores
    this.httpServiceColores.obtenerColores().subscribe((res) => {
      if (res.codigoError != 'OK') {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Colores.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        console.log(res.lstColors);
        this.lstColores = res.lstColors;
      }
    });
    //Obtenemos Atributos
    this.httpServiceAtributos.obtenerAtributos().subscribe((res) => {
      if (res.codigoError != 'OK') {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Atributos/Caracteristicas.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        console.log(res.lstAtributos);
        this.lstAtributos = res.lstAtributos;
      }
    });
    //Obtenemos Géneros
    this.httpServiceGeneros.obtenerGeneros().subscribe((res) => {
      if (res.codigoError != 'OK') {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Géneros.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        console.log(res.lstGeneros);
        this.lstGeneros = res.lstGeneros;
      }
    });
  }

  onSubmit(): void {
    console.log(!this.modelProductForm.valid);
    if (!this.modelProductForm.valid) {
      this.modelProductForm.markAllAsTouched();
      if (this.modelProductForm.get('linea')?.value == '0') {
        // this.selectLineas = true;
      }
    } else {
      if (this.modelProductForm.get('linea')?.value == '0') {
        // this.selectLineas = true;
      } else {
        // const modelEntity: ModelosEntity = {
        //   linea_id: this.modelProductForm.value!.linea ?? "",
        //   modelo: this.modelProductForm.value!.modeloProducto ?? "",
        //   etiquetas: this.modelProductForm.value!.etiquetas ?? "",
        //   cod_sap: this.modelProductForm.value!.codigoSAP ?? "",
        //   almacen_id: ''
        // };
        // this.httpService.agregarModelo(modelEntity).subscribe(res => {
        //   if (res.codigoError == "OK") {
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Guardado Exitosamente.',
        //       text: `Se ha creado el modelo ${this.modelProductForm.value.modeloProducto}`,
        //       showConfirmButton: true,
        //       confirmButtonText: "Ok"
        //     }).finally(() => {
        //       this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['modelos'] } }]);
        //     });
        //   } else {
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Ha ocurrido un error.',
        //       text: res.descripcionError,
        //       showConfirmButton: false,
        //     });
        //   }
        // })
      }
    }
  }

  changeLine(linea: any): void {
    // if (linea.target.value == 0) {
    //   this.selectLineas = true;
    // } else {
    //   this.selectLineas = false;
    //   this.modelProductForm.get("linea")?.setValue(linea.target.value);
    // }
  }

  visualizarModeloProductos() {
    this.router.navigate([
      '/navegation-adm',
      { outlets: { contentAdmin: ['modeloProductos'] } },
    ]);
  }

  //Eventos para los combos con autocomplete
  //Marca
  selectEventMark(item: any) {
    console.log(item);
  }
  //Modelo
  selectEventModel(item: any) {
    console.log(item);
  }
  //Color
  selectEventColor(item: any) {
    console.log(item);
  }
  //Atributo
  selectEventAttribute(item: any) {
    console.log(item);
  }
  //Genero
  selectEventGenre(item: any) {
    console.log(item);
  }
}
