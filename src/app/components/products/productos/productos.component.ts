import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faList, faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ProducAdmEntity } from 'src/app/models/productadm';
import { ProductosAdminService } from 'src/app/services/productos-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  faList = faList;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  //Declaración de variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  lstProductos: ProducAdmEntity[] = [];

  constructor(private readonly httpService: ProductosAdminService,
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

    this.httpService.obtenerProductos().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstProductos = res.lstProductos;
        this.dtTrigger.next('');
      }
    })
  }

  editarProducto(producto: ProducAdmEntity): void {
     this.httpService.asignarProducto(producto);
    // console.log(producto);
      this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['editarProductos'] } }]);
  }

  eliminarProducto(producto: ProducAdmEntity): void {
     Swal.fire({
       icon: 'question',
       title: `¿Esta seguro de eliminar ${producto.nombre}?`,
       showDenyButton: true,
       confirmButtonText: 'Si',
       denyButtonText: 'No',
     }).then((result) => {
       if (result.isConfirmed) {
         this.httpService.eliminarProducto(producto).subscribe(res => {
           if (res.codigoError == 'OK') {
             Swal.fire({
               icon: 'success',
               title: 'Eliminado Exitosamente.',
               text: `Se ha eliminado el Producto ${producto.nombre}`,
               showConfirmButton: true,
               confirmButtonText: "Ok"
             }).then(() => {
               // this.groupForm.reset();
               window.location.reload();
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
     })
  }

  deshabilitarProducto(producto: ProducAdmEntity): void {
    Swal.fire({
      icon: 'question',
      title: `¿Esta seguro de eliminar ${producto.nombre}?`,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.deshabilitarProducto(producto).subscribe(res => {
          if (res.codigoError == 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado Exitosamente.',
              text: `Se ha eliminado el Producto ${producto.nombre}`,
              showConfirmButton: true,
              confirmButtonText: "Ok"
            }).then(() => {
              // this.groupForm.reset();
              window.location.reload();
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
    })
 }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  agregarProducto() {
    this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['crearProductos'] } }]);
  }

  onMigrar(){
    this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['catalogos'] } }]);
  }
}
