import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModeloProductosEntity } from 'src/app/models/modeloproductos';
import { ProducAdmEntity } from 'src/app/models/productadm';
import { ModeloproductosService } from 'src/app/services/modeloproductos.service';
import { ProductosAdminService } from 'src/app/services/productos-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-create',
  templateUrl: './productos-create.component.html',
  styleUrls: ['./productos-create.component.css']
})
export class ProductosCreateComponent implements OnInit {

  //Iconos para la pagina de grupos
  faList = faList;
  faTimes = faTimes;
  faSave = faSave;
  //Creación de la variable para formulario
  modelProductForm = new FormGroup({
    modeloproducto_id: new FormControl('0', Validators.required),
    producto: new FormControl('', [Validators.required]),
    etiquetas: new FormControl('', [Validators.required]),
    tamanio: new FormControl('', [Validators.required]),
    codigoSAP: new FormControl('', [Validators.required])
  });
  //Variables para listas desplegables
  lstModeloProductos: ModeloProductosEntity[] = [];
  
  //Variables para validar selección
  selectModeloProducto: boolean = false;
  selectedModeloProducto: string | undefined = '' ;
 
  //Variables para Autocomplete
  keywordModelProduct = 'modelo_producto';

 

  constructor(
    
    private readonly httpServiceModelosProductos: ModeloproductosService,
    private readonly httpService: ProductosAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    //Obtenemos Modelos Productos
    this.httpServiceModelosProductos.obtenerModelosProductos().subscribe((res) => {
      if (res.codigoError != 'OK') {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Modelos.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstModeloProductos = res.lstModelo_Productos;
      }
    });
    
  }

  onSubmit(): void {
    console.log(!this.modelProductForm.valid);
    if (!this.modelProductForm.valid) {
      this.modelProductForm.markAllAsTouched();
      
      if (this.modelProductForm.get('modelo_producto_id')?.value == '0') {
        this.selectModeloProducto = true;
      }
     
    } else {
      if (this.modelProductForm.get('modelo_producto_id')?.value == '0') {
        this.selectModeloProducto = true;
      
      } else {
        const productEntity: ProducAdmEntity = {
          id: '',
          tamanio: this.modelProductForm.value!.tamanio ?? "",
          nombre: this.modelProductForm.value!.producto ?? "",
          etiquetas: this.modelProductForm.value!.etiquetas ?? "",
          es_plasticaucho: '',
          es_sincronizado: '',
          modelo_producto_id: this.modelProductForm.value!.modeloproducto_id ?? "",
          cod_sap: this.modelProductForm.value!.codigoSAP ?? "",
          impuesto_id: '',
          impuesto_nombre: '',
          marca_nombre: '',
          color_nombre: '',
          atributo_nombre: '',
          genero_nombre: '',
          modelo_nombre: '',
          modelo_producto: ''
        };
        console.log(productEntity);
        this.httpService.agregarProducto(productEntity).subscribe(res => {
          if (res.codigoError == "OK") {
            Swal.fire({
              icon: 'success',
              title: 'Guardado Exitosamente.',
              text: `Se ha creado el Modelo Producto ${this.modelProductForm.value.producto}`,
              showConfirmButton: true,
              confirmButtonText: "Ok"
            }).finally(() => {
              this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['productos'] } }]);
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
      { outlets: { contentAdmin: ['productos'] } },
    ]);
  }

  //Disparador cuando selecciona algún item de los combos
  
  onChangeSearchModel(val: string) {
    if (val == '') {
      this.selectModeloProducto = true;
      this.modelProductForm.controls['modeloproducto_id'].setValue('0');
    }
  }
  //Modelo
  selectEventModel(item: ModeloProductosEntity) {
    this.selectModeloProducto = false;
    this.selectedModeloProducto = item.etiquetas;
    this.modelProductForm.controls['modeloproducto_id'].setValue(item.id!);
  }
  //Evento para cuando se limpia los cuadros de texto
  
  onInputClearedModel() {
    this.selectModeloProducto=true;
    this.modelProductForm.controls['modeloproducto_id'].setValue('0');
  }


}
