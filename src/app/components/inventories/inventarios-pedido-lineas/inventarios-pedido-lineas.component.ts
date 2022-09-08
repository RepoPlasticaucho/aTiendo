import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrashAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { InventariosEntity } from 'src/app/models/inventarios';
import { LineasEntity } from 'src/app/models/lineas';
import { ModelosEntity } from 'src/app/models/modelos';
import { InventariosService } from 'src/app/services/inventarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventarios-pedido-lineas',
  templateUrl: './inventarios-pedido-lineas.component.html',
  styleUrls: ['./inventarios-pedido-lineas.component.css']
})
export class InventariosPedidoLineasComponent implements OnInit {
  private codigocategoria: string = "";
  private codigoalmacen :string ="";
  private codigolinea :string ="";
  faUserFriends = faUserFriends;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  //Declaración de variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  lstInventarios: InventariosEntity[] = [];
  lstModelos: ModelosEntity[] = [];
  codigomodel: string | undefined;

  constructor(private readonly httpService: InventariosService,
     private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      paging: true,
      search: false,
      searching: true,
      ordering: true,
      info: true,
      responsive:true
    }
    this.httpService.obtenerInventario$.subscribe(res => {
        
      this.codigocategoria = res.categoria_id ?? "";
      this.codigoalmacen = res.almacen_id ?? "";
      this.codigolinea = res.linea_id ?? "";

      if (this.codigocategoria || this.codigoalmacen || this.codigolinea == null) {
        const linea : LineasEntity ={
          id :this.codigolinea,
          categoria_id: '',
          linea: '',
          etiquetas: '',
          cod_sap: ''
        }
  
        const inventario : InventariosEntity = {
          categoria_id: this.codigocategoria,
          categoria: '',
          linea_id: this.codigolinea,
          linea: '',
          modelo_id: '',
          marca_id: '',
          marca: '',
          modelo_producto_id: '',
          idProducto: '',
          Producto: '',
          id: '',
          dInventario: '',
          producto_id: '',
          almacen_id: this.codigoalmacen,
          almacen: '',
          stock: '',
          stock_optimo: '',
          fav: ''
        }
  
        this.httpService.obtenerModelosLineas(linea).subscribe(res => {
          if (res.codigoError != "OK") {
            Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error.',
              text: res.descripcionError,
              showConfirmButton: false,
              // timer: 3000
            });
          } else {
            this.lstModelos = res.lstModelos;
            
            this.httpService.obtenerPortafoliosLineas(inventario).subscribe(res => {
              if (res.codigoError != "OK") {
                Swal.fire({
                  icon: 'error',
                  title: 'Ha ocurrido un error.',
                  text: res.descripcionError,
                  showConfirmButton: false,
                  // timer: 3000
                });
              } else {
                this.lstInventarios = res.lstInventarios;
                this.dtTrigger.next('');
              }
              
            })
  
          }
        })
      }
      
      else{
        this.router.navigate(['/navegation-cl', { outlets: { 'contentClient': ['inventarios-pedido'] } }]);

      }
      

    })
  }
  buscarPortafolioLineaModelo(card : ModelosEntity){
    this.codigomodel = card["id"];
    
    const inventario : InventariosEntity = {
      categoria_id: this.codigocategoria,
      categoria: '',
      linea_id: this.codigolinea,
      linea: '',
      modelo_id: this.codigomodel,
      marca_id: '',
      marca: '',
      modelo_producto_id: '',
      idProducto: '',
      Producto: '',
      id: '',
      dInventario: '',
      producto_id: '',
      almacen_id: this.codigoalmacen,
      almacen: '',
      stock: '',
      stock_optimo: '',
      fav: ''
    }
    console.log(inventario);
    this.httpService.asignarModelo(inventario);
    this.router.navigate(['/navegation-cl', { outlets: { 'contentClient': ['inventarios-pedido-modelos'] } }]);
  }  

}
