import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faList, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { CatalogosEntity } from 'src/app/models/catalogos';
import { CategoriasEntity } from 'src/app/models/categorias';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

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
                console.log(res);
              } 
            });
            
        });
      }
    })
  }

}
