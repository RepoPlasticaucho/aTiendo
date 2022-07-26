import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-modeloproductos-edit',
  templateUrl: './modeloproductos-edit.component.html',
  styleUrls: ['./modeloproductos-edit.component.css'],
})
export class ModeloproductosEditComponent implements OnInit {
  //Iconos para la pagina de grupos
  faList = faList;
  faTimes = faTimes;
  faSave = faSave;
  //Creación de la variable para formulario
  modelProductForm = new FormGroup({
    marca_id: new FormControl('0'),
    marca: new FormControl('0', Validators.required),
    modelo_id: new FormControl('0'),
    modelo: new FormControl('0', Validators.required),
    color_id: new FormControl('0'),
    color: new FormControl('0', Validators.required),
    atributo_id: new FormControl('0'),
    atributo: new FormControl('0', Validators.required),
    genero_id: new FormControl('0'),
    genero: new FormControl('0', Validators.required),
    modeloProducto: new FormControl('', [Validators.required]),
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
  //Inicialización de Autocomplete
  initialMark: string = '';
  initialModel: string = '';
  initialColor: string = '';
  initialAttribute: string = '';
  initialGenre: string = '';
  //Variable contenedor id Modelo Producto
  codigo: string = '';
  constructor(
    private readonly httpServiceMarcas: MarcasService,
    private readonly httpServiceModelos: ModelosService,
    private readonly httpServiceColores: ColoresService,
    private readonly httpServiceAtributos: AtributosService,
    private readonly httpServiceGeneros: GenerosService,
    private readonly httpService: ModeloproductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    $(document).ready(() => {
      $('#markInput :input').val(this.initialMark);
      $('#modelInput :input').val(this.initialModel);
      $('#colorInput :input').val(this.initialColor);
      $('#attributeInput :input').val(this.initialAttribute);
      $('#genreInput :input').val(this.initialGenre);
    });
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
    //Cargar los datos Lineas Modificar
    this.httpService.obtenermodeloproducto$.subscribe((res) => {
      if (res.id == '') {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error.',
          text: 'No se ha obtenido información.',
          showConfirmButton: false,
        }).finally(() => {
          this.router.navigate([
            '/navegation-adm',
            { outlets: { contentAdmin: ['modeloProductos'] } },
          ]);
        });
      } else {
        //Asignamos los valores a los campos
        this.codigo = res.id!;
        this.modelProductForm.get('modeloProducto')?.setValue(res.modelo_producto);
        this.modelProductForm.get('codigoSAP')?.setValue(res.cod_sap);
        this.initialMark = res.marca!;
        this.initialModel = res.modelo!;
        this.initialColor = res.color!;
        this.initialAttribute = res.atributo!;
        this.initialGenre = res.genero!;
      }
    });
  }

  onSubmit(): void {
    console.log(this.modelProductForm.valid);
    console.log(this.modelProductForm.value);
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
          id: this.codigo,
          marca_id: this.modelProductForm.value!.marca_id ?? this.lstMarcas.filter(x => x.marca == this.modelProductForm.value.marca)[0].id,
          modelo_id: this.modelProductForm.value!.modelo_id ?? this.lstModelos.filter(x => x.modelo == this.modelProductForm.value.modelo)[0].id!,
          color_id: this.modelProductForm.value!.color_id ?? this.lstColores.filter(x => x.color == this.modelProductForm.value.color)[0].id,
          atributo_id: this.modelProductForm.value!.atributo_id ?? this.lstAtributos.filter(x => x.atributo == this.modelProductForm.value.atributo)[0].id,
          genero_id: this.modelProductForm.value!.genero_id ?? this.lstGeneros.filter(x => x.genero == this.modelProductForm.value.genero)[0].id,
          modelo_producto: this.modelProductForm.value!.modeloProducto ?? '',
          cod_sap: this.modelProductForm.value!.codigoSAP ?? '',
        };
        this.httpService
          .actualizarModeloProducto(modelProductEntity)
          .subscribe((res) => {
            if (res.codigoError == 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Modificado Exitosamente.',
                text: `Se ha modificado el Modelo Producto ${this.modelProductForm.value.modeloProducto}`,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
              }).finally(() => {
                this.router.navigate([
                  '/navegation-adm',
                  { outlets: { contentAdmin: ['modeloProductos'] } },
                ]);
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error.',
                text: res.descripcionError,
                showConfirmButton: false,
              });
            }
          });
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
    this.modelProductForm.controls['marca'].setValue(item.marca);
    this.modelProductForm.controls['marca_id'].setValue(item.id);
  }

  //Modelo
  selectEventModel(item: ModelosEntity) {
    this.selectModelos = false;
    this.modelProductForm.controls['modelo'].setValue(item.modelo);
    this.modelProductForm.controls['modelo_id'].setValue(item.id!);
  }

  //Color
  selectEventColor(item: ColorsEntity) {
    this.selectColores = false;
    this.modelProductForm.controls['color'].setValue(item.color);
    this.modelProductForm.controls['color_id'].setValue(item.id);
  }

  //Atributo
  selectEventAttribute(item: AtributosEntity) {
    this.selectAtributos = false;
    this.modelProductForm.controls['atributo'].setValue(item.atributo);
    this.modelProductForm.controls['atributo_id'].setValue(item.id);
  }

  //Genero
  selectEventGenre(item: GenerosEntity) {
    this.selectGeneros = false;
    this.modelProductForm.controls['genero'].setValue(item.genero);
    this.modelProductForm.controls['genero_id'].setValue(item.id);
  }

  //Disparador cuando se escribe algún item de los combos
  onChangeSearchMark(val: string) {
    if (val == '') {
      this.selectMarcas = true;
      this.modelProductForm.controls['marca_id'].setValue('0');
      this.modelProductForm.controls['marca'].setValue('');
    }
  }

  onChangeSearchModel(val: string) {
    if (val == '') {
      this.selectModelos = true;
      this.modelProductForm.controls['modelo_id'].setValue('0');
      this.modelProductForm.controls['modelo'].setValue('');
    }
  }

  onChangeSearchColor(val: string) {
    if (val == '') {
      this.selectColores = true;
      this.modelProductForm.controls['color_id'].setValue('0');
      this.modelProductForm.controls['color'].setValue('');

    }
  }

  onChangeSearchAttribute(val: string) {
    if (val == '') {
      this.selectAtributos = true;
      this.modelProductForm.controls['atributo_id'].setValue('0');
      this.modelProductForm.controls['atributo'].setValue('');

    }
  }

  onChangeSearchGenre(val: string) {
    if (val == '') {
      this.selectGeneros = true;
      this.modelProductForm.controls['genero_id'].setValue('0');
      this.modelProductForm.controls['genero'].setValue('');
    }
  }
  //Evento para cuando se limpia los cuadros de texto
  onInputClearedMark() {
    this.selectMarcas = true;
    this.modelProductForm.controls['marca_id'].setValue('0');
    this.modelProductForm.controls['marca'].setValue('');
  }

  onInputClearedModel() {
    this.selectModelos = true;
    this.modelProductForm.controls['modelo_id'].setValue('0');
    this.modelProductForm.controls['modelo'].setValue('');
  }

  onInputClearedColor() {
    this.selectColores = true;
    this.modelProductForm.controls['color_id'].setValue('0');
    this.modelProductForm.controls['color'].setValue('');
  }

  onInputClearedAttribute() {
    this.selectAtributos = true;
    this.modelProductForm.controls['atributo_id'].setValue('0');
    this.modelProductForm.controls['atributo'].setValue('');
  }

  onInputClearedGenre() {
    this.selectGeneros = true;
    this.modelProductForm.controls['genero_id'].setValue('0');
    this.modelProductForm.controls['genero'].setValue('');
  }

}
