import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faList, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Console } from 'console';
import { Subject } from 'rxjs';
import { AtributosEntity } from 'src/app/models/atributos';
import { CatalogosEntity } from 'src/app/models/catalogos';
import { CategoriasEntity } from 'src/app/models/categorias';
import { ColorsEntity } from 'src/app/models/colors';
import { GenerosEntity } from 'src/app/models/generos';
import { LineasEntity } from 'src/app/models/lineas';
import { MarcasEntity } from 'src/app/models/marcas';
import { ModelosEntity } from 'src/app/models/modelos';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {
  faList = faList;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  //Declaración de variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  lstCatalogos: CatalogosEntity[] = [];
  variable : string | undefined;

  constructor(private readonly httpService: CatalogosService,
    private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      paging: true,
      pageLength:100,
      search: false,
      searching: true,
      ordering: true,
      info: true,
      responsive: true
    }

    this.httpService.obtenerCatalogo().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
          this.lstCatalogos = res.lstCatalogos;
          this.dtTrigger.next('');
          // console.log(res); 
          
          //CARGA DE CATEGORIAS.
          const catalogoCategorias = [...new Set(res.lstCatalogos.map(item => item.categoria))];
          catalogoCategorias.forEach((value) =>{
            
            const categoria : CategoriasEntity ={
              id: '',
              categoria: value,
              cod_sap: '',
              etiquetas: '',
              almacen_id: '',
            }   
            // console.log(categoria);
            this.httpService.obtenerCategoriasNombre(categoria).subscribe(res =>{
              if (res.codigoError != "OK") {
                const categorianew : CategoriasEntity ={
                  id: '',
                  categoria: value,
                  cod_sap: value,
                  etiquetas: value,
                  almacen_id: '',
                }
                this.httpService.agregarCategoria(categorianew).subscribe(res =>{
                  if (res.codigoError == "OK") {
                    console.log("carga de Categorias con exito ")
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Ha ocurrido un error en la crecacion de las categorias.',
                      text: res.descripcionError,
                      showConfirmButton: false,
                    });
                  }
                });
              }else{
                console.log("No hay Categorias Nuevas");
              } 
            });
          });

        //// CARGA DE MARCAS
          const catalogoMarcas = [...new Set(res.lstCatalogos.map(item => item.marca))];
          catalogoMarcas.forEach((value) =>{
            const marca : MarcasEntity ={
              id: "",
              marca: value,
              etiquetas: "",
              url_image: ""
            }   
            this.httpService.obtenerMarcasNombre(marca).subscribe(res =>{
              if (res.codigoError != "OK") {
                const marcanew : MarcasEntity ={
                  id: "",
                  marca: value,
                  etiquetas: value,
                  url_image: ""
                }  
                //console.log(marcanew)
                this.httpService.agregarMarca(marcanew).subscribe(res =>{
                  if (res.codigoError == "OK") {
                    console.log("carga de Marcas con exito ")
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Ha ocurrido un error en la crecacion de las Marcas.',
                      text: res.descripcionError,
                      showConfirmButton: false,
                    });
                  }
                });
              }else{
                console.log("No hay Marcas Nuevas");
              } 
            });  
          });

          ///CARGA DE ATRIBUTOS
          const catalogoAtributos = [...new Set(res.lstCatalogos.map(item => item.caracteristica))];
          catalogoAtributos.forEach((value) =>{
            const caracteristica : AtributosEntity ={
              id: "",
              atributo: value,
              etiquetas: ""
            }   
            this.httpService.obtenerAtributoNombre(caracteristica).subscribe(res =>{
              if (res.codigoError != "OK") {
                const caracteristicanew : AtributosEntity ={
                  id: "",
                  atributo: value,
                  etiquetas: value
                }   
               // console.log(caracteristicanew)
                
                this.httpService.agregarAtributo(caracteristicanew).subscribe(res =>{
                  if (res.codigoError == "OK") {
                    console.log("carga de Caracteristicas con exito ")
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Ha ocurrido un error en la crecacion de las Caracteristicas.',
                      text: res.descripcionError,
                      showConfirmButton: false,
                    });
                  }
                });
              }else{
                console.log("No hay Caracteristicas Nuevas");
              } 
            });  
          });

         ///CARGA DE COLORES
          const catalogoColores = [...new Set(res.lstCatalogos.map(item => item.color))];
          catalogoColores.forEach((value) =>{
            const color : ColorsEntity ={
              id: "",
              color: value,
              cod_sap: "",
              etiquetas: ""
            }   
            this.httpService.obtenerColoresNombre(color).subscribe(res =>{
              if (res.codigoError != "OK") {
                const colornew : ColorsEntity ={
                  id: "",
                  color: value,
                  cod_sap: value,
                  etiquetas: value
                }   
                //console.log(colornew)
                this.httpService.agregarColor(colornew).subscribe(res =>{
                  if (res.codigoError == "OK") {
                    console.log("carga de Colores con exito ")
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Ha ocurrido un error en la crecacion de las Colores.',
                      text: res.descripcionError,
                      showConfirmButton: false,
                    });
                  }
                });
              }else{
                console.log("No hay Colores Nuevos");
              } 
            });  
          });

         ///CARGA DE GENEROS
         const catalogoGeneros = [...new Set(res.lstCatalogos.map(item => item.genero))];
         catalogoGeneros.forEach((value) =>{
            const genero : GenerosEntity ={
              id: "",
              genero: value,
              etiquetas: ""
            }   
           this.httpService.obtenerGenerosNombre(genero).subscribe(res =>{
             if (res.codigoError != "OK") {
                const generonew : GenerosEntity ={
                id: "",
                genero: value,
                etiquetas: ""
                } 
               //console.log(colornew)
               this.httpService.agregarGenero(generonew).subscribe(res =>{
                 if (res.codigoError == "OK") {
                   console.log("carga de Generos con exito ")
                 }else{
                   Swal.fire({
                     icon: 'error',
                     title: 'Ha ocurrido un error en la crecacion de los Generos.',
                     text: res.descripcionError,
                     showConfirmButton: false,
                   });
                 }
               });
             }else{
               console.log("No hay Generos Nuevos");
             } 
           });  
         });
      }

      ///CARGA DE LINEAS
      this.httpService.obtenerCatalogoLineas().subscribe(res =>{
        if (res.codigoError != "OK") {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error.',
            text: res.descripcionError,
            showConfirmButton: false,
          }); 
        } else {
            res.lstCatalogos.forEach((value) => {
              const linea : LineasEntity ={
                linea: value.tipo,
                etiquetas: '',
                cod_sap: '',
                almacen_id: '',
                categoria_nombre : value.categoria
              }
              this.httpService.obtenerCatalogoLinea(linea).subscribe(res => {
                  if (res.codigoError != "OK") {
                    const categoria : CategoriasEntity={
                      cod_sap: '',
                      etiquetas: '',
                      almacen_id: '',
                      categoria: value.categoria
                    }
                    this.httpService.obtenerCategoriaNombre(categoria).subscribe(res=>{
                      const lstCat = res.lstCategorias;

                      lstCat.forEach((valor) => {
                        const lineanew :LineasEntity={
                          linea: value.tipo,
                          etiquetas: '',
                          cod_sap: '',
                          almacen_id: '',
                          categoria_id : valor.id
                        }
                        this.httpService.agregarLinea(lineanew).subscribe(res =>{
                          if (res.codigoError == "OK") {
                            console.log("carga de Lineas con exito ")
                          }else{
                            Swal.fire({
                              icon: 'error',
                              title: 'Ha ocurrido un error en la crecacion de las Lineas.',
                              text: res.descripcionError,
                              showConfirmButton: false,
                            });
                          }
                        });
                      });
                    })
                  } else {
                    console.log("No hay Lineas Nuevas");
                  }
              })
            });          
          } 
      });

      ///// FUNCION PARA CARGAR MODELOS
      this.httpService.obtenerCatalogoModelos().subscribe(res =>{
        if (res.codigoError != "OK") {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error.',
            text: res.descripcionError,
            showConfirmButton: false,
          }); 
        } else {
            res.lstCatalogos.forEach((value) => {
              const modelo : ModelosEntity={
                linea_id: '',
                linea_nombre: value.tipo,
                modelo: value.producto,
                etiquetas: '',
                cod_sap: ''
              }
              //  console.log(modelo);
              
              this.httpService.obtenerCatalogoModelo(modelo).subscribe(res => {
                  if (res.codigoError != "OK") {

                    const linea : LineasEntity ={
                      linea: value.tipo,
                      etiquetas: '',
                      cod_sap: '',
                      almacen_id: '',
                      categoria_nombre :value.categoria
                    }
                   // console.log(linea);
                   this.httpService.obtenerLineaNombre(linea).subscribe(res=>{
                      const lstLin = res.lstLineas; 
                      lstLin.forEach((valor) => {
                        const modelonew :ModelosEntity={
                          linea_id: valor.id!,
                          modelo: value.producto,
                          etiquetas: value.producto,
                          cod_sap: value.linea_producto_id
                        }
                      //  console.log(modelonew);
                        this.httpService.agregarModelo(modelonew).subscribe(res =>{
                          if (res.codigoError == "OK") {
                            console.log("carga de Modelos con exito ")
                          }else{
                            Swal.fire({
                              icon: 'error',
                              title: 'Ha ocurrido un error en la crecacion de los Modelos.',
                              text: res.descripcionError,
                              showConfirmButton: false,
                            });
                          }
                        })
                      });
                   })
                  } else {
                   // console.log(res.lstModelos);
                    res.lstModelos.forEach((val) => {
                      const modelonew :ModelosEntity={
                        linea_id: val.linea_id,
                        modelo: val.modelo,
                        etiquetas: val.etiquetas,
                        cod_sap: value.linea_producto_id,
                        id:val.id
                      }
                      this.httpService.actualizarModelo(modelonew).subscribe(res =>{
                          if (res.codigoError == "OK") {
                            console.log(" Actualizacion de Modelos con exito ")
                          }else{
                            Swal.fire({
                              icon: 'error',
                              title: 'Ha ocurrido un error en la crecacion de los Modelos.',
                              text: res.descripcionError,
                              showConfirmButton: false,
                            });
                          }
                        })
                    });
                  }
              })
            });          
          } 
      });

      ///
    })
  }
}
