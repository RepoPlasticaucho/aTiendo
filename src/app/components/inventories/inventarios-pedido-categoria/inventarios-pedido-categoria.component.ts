import { Component, OnInit } from '@angular/core';
import { InventariosService } from 'src/app/services/inventarios.service';
import { InventariosEntity } from 'src/app/models/inventarios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrashAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-inventarios-pedido-categoria',
  templateUrl: './inventarios-pedido-categoria.component.html',
  styleUrls: ['./inventarios-pedido-categoria.component.css']
})
export class InventariosPedidoCategoriaComponent implements OnInit {
  ///Iconos para la pagina de grupos
  faUserFriends = faUserFriends;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  //Declaración de variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  lstInventarios: InventariosEntity[] = [];
  
  private codigocategoria: string = "";
  private codigoalmacen :string ="";
  constructor(private readonly httpService: InventariosService, ) { }
  
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
      
        const inventario : InventariosEntity = {
          categoria_id: this.codigocategoria,
          categoria: '',
          linea_id: '',
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

        this.httpService.obtenerPortafoliosCategoria(inventario).subscribe(res => {
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
    })
  }
}