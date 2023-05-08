import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModeloProductosEntity } from 'src/app/models/modeloproductos';
import { ProducAdmEntity } from 'src/app/models/productadm';
import { ModeloproductosService } from 'src/app/services/modeloproductos.service';
import { ModelosService } from 'src/app/services/modelos.service';
import { ProductosAdminService } from 'src/app/services/productos-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-edit',
  templateUrl: './productos-edit.component.html',
  styleUrls: ['./productos-edit.component.css']
})
export class ProductosEditComponent implements OnInit {

    //Iconos para la pagina de grupos
    faList = faList;
    faTimes = faTimes;
    faSave = faSave;
    //Creación de la variable para formulario
    modelProductForm = new FormGroup({
      modeloproducto_id: new FormControl('0', Validators.required),
      producto: new FormControl('', [Validators.required]),
      etiqueta: new FormControl('', [Validators.required]),
      tamanio: new FormControl('', [Validators.required]),
      codigoSAP: new FormControl('', [Validators.required]),
    });
    //Variables para listas desplegables
    lstModeloProductos: ModeloProductosEntity[] = [];

    //Variables para validar selección
    selectModeloProductos: boolean = false;
    

    //Variables para Autocomplete
    keywordModelProduct = 'modelo_producto';

    //Inicialización de Autocomplete
    initialModelProduct: string = '';

    //Variable contenedor id Modelo Producto
    codigo: string = '';

    constructor(
      private readonly httpServiceModeloProductos: ModeloproductosService,
      private readonly httpService: ProductosAdminService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      $(document).ready(() => {
       
        $('#modelInput :input').val(this.initialModelProduct);
      
      });
      
      
      //Obtenemos Modelos
      this.httpServiceModeloProductos.obtenerModelosProductos().subscribe((res) => {
        if (res.codigoError != 'OK') {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo obtener Modelos.',
            text: res.descripcionError,
            showConfirmButton: false,
          });
        } else {
          this.lstModeloProductos = res.lstModelo_Productos;
         // console.log(this.lstModeloProductos);
        }
      });
      
      //Cargar los datos Lineas Modificar
      this.httpService.obtenerproducto$.subscribe((res) => {
        if (res.id == '') {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error.',
            text: 'No se ha obtenido información.',
            showConfirmButton: false,
          }).finally(() => {
            this.router.navigate([
              '/navegation-adm',
              { outlets: { contentAdmin: ['productos'] } },
            ]);
          });
        } else {
          //Asignamos los valores a los campos
          console.log(res);
          this.codigo = res.id!;
          this.modelProductForm.get('producto')?.setValue(res.nombre);
          this.modelProductForm.get('codigoSAP')?.setValue(res.cod_sap);
          this.modelProductForm.get('tamanio')?.setValue(res.tamanio);
          this.modelProductForm.get('etiqueta')?.setValue(res.etiquetas)
          this.initialModelProduct = res.modelo_producto!;
         
        }
      });
    }
  
    onSubmit(): void {
      console.log(this.modelProductForm.valid);
      console.log(this.modelProductForm.value);
      if (!this.modelProductForm.valid) {
        this.modelProductForm.markAllAsTouched();
        
        if (this.modelProductForm.get('modeloproducto_id')?.value == '0') {
          this.selectModeloProductos = true;
        }
        
      } else {
        if (this.modelProductForm.get('modeloproducto_id')?.value == '0') {
          this.selectModeloProductos = true;
        } else {
          const productEntity: ProducAdmEntity = {
            id: this.codigo,
            modelo_producto_id: this.modelProductForm.value!.modeloproducto_id ?? "",
            nombre: this.modelProductForm.value!.producto ?? '',
            cod_sap: this.modelProductForm.value!.codigoSAP ?? '',
            tamanio : this.modelProductForm.value!.tamanio ?? '',
            etiquetas: this.modelProductForm.value!.etiqueta ?? '',            
            es_plasticaucho: '',
            es_sincronizado: '',
            modelo_producto: '',
            impuesto_id: '',
            impuesto_nombre: '',
            marca_nombre: '',
            color_nombre: '',
            atributo_nombre: '',
            genero_nombre: '',
            modelo_nombre: ''
          };

          console.log(productEntity);

          this.httpService.actualizarProducto(productEntity).subscribe((res) => {
              if (res.codigoError == 'OK') {
                Swal.fire({
                  icon: 'success',
                  title: 'Modificado Exitosamente.',
                  text: `Se ha modificado el Modelo Producto ${this.modelProductForm.value.producto}`,
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
        { outlets: { contentAdmin: ['productos'] } },
      ]);
    }
  
    //Disparador cuando selecciona algún item de los combos
    //Modelo
    selectEventModel(item: ModeloProductosEntity) {
      this.selectModeloProductos = false;
      //this.selectedModeloProducto = item.etiquetas;
      this.modelProductForm.controls['modeloproducto_id'].setValue(item.id!);
    }
  
    //Disparador cuando se escribe algún item de los combos
  
    onChangeSearchModel(val: string) {
      if (val == '') {
        this.selectModeloProductos = true;
        this.modelProductForm.controls['modeloproducto_id'].setValue('0');
      }
    }
  
    //Evento para cuando se limpia los cuadros de texto
  
    onInputClearedModel() {
      this.selectModeloProductos = true;
      this.modelProductForm.controls['modeloproducto_id'].setValue('0');
    }
  
  }

  //// REVISAR ESTA CON ERROR AL ACTUALIZAR.