import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AtributosEntity } from 'src/app/models/atributos';
import { ColorsEntity } from 'src/app/models/colors';
import { GenerosEntity } from 'src/app/models/generos';
import { MarcasEntity } from 'src/app/models/marcas';
import { ModeloProductosEntity } from 'src/app/models/modeloproductos';
import { ModelosEntity } from 'src/app/models/modelos';
import { AtributosService } from 'src/app/services/atributos.service';
import { ColoresService } from 'src/app/services/colores.service';
import { GenerosService } from 'src/app/services/generos.service';
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
    codigoSAP: new FormControl('', [Validators.required])
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
        this.lstGeneros = res.lstGeneros;
      }
    });
  }

  onSubmit(): void {
    console.log(!this.modelProductForm.valid);
    if (!this.modelProductForm.valid) {
      this.modelProductForm.markAllAsTouched();
      if (this.modelProductForm.get('marca_id')?.value == '0') {
        this.selectMarcas = true;
      }
      if (this.modelProductForm.get('modelo_id')?.value == '0') {
        this.selectModelos = true;
      }
      if (this.modelProductForm.get('color_id')?.value == '0') {
        this.selectColores = true;
      }
      if (this.modelProductForm.get('atributo_id')?.value == '0') {
        this.selectAtributos = true;
      }
      if (this.modelProductForm.get('genero_id')?.value == '0') {
        this.selectGeneros = true;
      }
    } else {
      if (this.modelProductForm.get('marca_id')?.value == '0') {
        this.selectMarcas = true;
      } else if (this.modelProductForm.get('modelo_id')?.value == '0') {
        this.selectModelos = true;
      } else if (this.modelProductForm.get('color_id')?.value == '0') {
        this.selectColores = true;
      } else if (this.modelProductForm.get('atributo_id')?.value == '0') {
        this.selectAtributos = true;
      } else if (this.modelProductForm.get('genero_id')?.value == '0') {
        this.selectGeneros = true;
      } else {
        const modelProductEntity: ModeloProductosEntity = {
          marca_id: this.modelProductForm.value!.marca_id ?? "",
          modelo_id: this.modelProductForm.value!.modelo_id ?? "",
          color_id: this.modelProductForm.value!.color_id ?? "",
          atributo_id: this.modelProductForm.value!.atributo_id ?? "",
          genero_id: this.modelProductForm.value!.genero_id ?? "",
          modelo_producto: this.modelProductForm.value!.modeloProducto ?? "",
          cod_sap: this.modelProductForm.value!.codigoSAP ?? ""
        };
        console.log(modelProductEntity);
        this.httpService.agregarModeloProducto(modelProductEntity).subscribe(res => {
          if (res.codigoError == "OK") {
            Swal.fire({
              icon: 'success',
              title: 'Guardado Exitosamente.',
              text: `Se ha creado el Modelo Producto ${this.modelProductForm.value.modeloProducto}`,
              showConfirmButton: true,
              confirmButtonText: "Ok"
            }).finally(() => {
              this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['modeloProductos'] } }]);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error.',
              text: res.descripcionError,
              showConfirmButton: false,
            });
          }
        })
      }
    }
  }

  visualizarModeloProductos() {
    this.router.navigate([
      '/navegation-adm',
      { outlets: { contentAdmin: ['modeloProductos'] } },
    ]);
  }

  //Disparador cuando selecciona algún item de los combos
  //Marca
  selectEventMark(item: MarcasEntity) {
    this.selectMarcas = false;
    this.modelProductForm.controls['marca_id'].setValue(item.id);
  }

  //Modelo
  selectEventModel(item: ModelosEntity) {
    this.selectModelos = false;
    this.modelProductForm.controls['modelo_id'].setValue(item.id!);
  }

  //Color
  selectEventColor(item: ColorsEntity) {
    this.selectColores = false;
    this.modelProductForm.controls['color_id'].setValue(item.id);
  }

  //Atributo
  selectEventAttribute(item: AtributosEntity) {
    this.selectAtributos = false;
    this.modelProductForm.controls['atributo_id'].setValue(item.id);
  }

  //Genero
  selectEventGenre(item: any) {
    this.selectGeneros = false;
    this.modelProductForm.controls['genero_id'].setValue(item.id);
  }

  //Disparador cuando se escribe algún item de los combos
  onChangeSearchMark(val: string) {
    if (val == '') {
      this.selectMarcas = true;
      this.modelProductForm.controls['marca_id'].setValue('0');
    }
  }

  onChangeSearchModel(val: string) {
    if (val == '') {
      this.selectModelos = true;
      this.modelProductForm.controls['modelo_id'].setValue('0');
    }
  }

  onChangeSearchColor(val: string) {
    if (val == '') {
      this.selectColores = true;
      this.modelProductForm.controls['color_id'].setValue('0');
    }
  }

  onChangeSearchAttribute(val: string) {
    if (val == '') {
      this.selectAtributos = true;
      this.modelProductForm.controls['atributo_id'].setValue('0');
    }
  }

  onChangeSearchGenre(val: string) {
    if (val == '') {
      this.selectGeneros = true;
      this.modelProductForm.controls['genero_id'].setValue('0');
    }
  }
  //Evento para cuando se limpia los cuadros de texto
  onInputClearedMark(){
    this.selectMarcas=true;
    this.modelProductForm.controls['marca_id'].setValue('0');
  }

  onInputClearedModel() {
    this.selectModelos=true;
    this.modelProductForm.controls['modelo_id'].setValue('0');
  }

  onInputClearedColor() {
    this.selectColores=true;
    this.modelProductForm.controls['color_id'].setValue('0');
  }

  onInputClearedAttribute() {
    this.selectAtributos=true;
    this.modelProductForm.controls['atributo_id'].setValue('0');
  }

  onInputClearedGenre() {
    this.selectGeneros=true;
    this.modelProductForm.controls['genero_id'].setValue('0');
  }
}
