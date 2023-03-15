import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrashAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { TercerosEntity } from 'src/app/models/terceros';
import { TercerosService } from 'src/app/services/terceros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.css']
})
export class TercerosComponent implements OnInit {

   ///Iconos para la pagina de grupos
   faUserFriends = faUserFriends;
   faEdit = faEdit;
   faTrashAlt = faTrashAlt;
   faPlus = faPlus;
   //Declaración de variables
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject<any>();
   lstTerceros: TercerosEntity[] = [];

  constructor(private readonly httpService: TercerosService,
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

    this.httpService.obtenerTercerosAll().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error.',
          text: res.descripcionError,
          showConfirmButton: false,
          // timer: 3000
        });
      } else {
        this.lstTerceros = res.lstTerceros;
        this.dtTrigger.next('');
      }
    })

  }

}
