import { Component, OnInit } from '@angular/core';
import { faEdit, faPlus, faTrashAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { GruposEntity } from 'src/app/models/grupos';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  //Iconos para la pagina de grupos
  faUserFriends = faUserFriends;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  //Declaración de variables
  dtOptions: DataTables.Settings = {};
  lstGrupos: GruposEntity[] = [];

  constructor(private readonly httpService: GruposService) { }

  ngOnInit(): void {

    const gruposEntity: GruposEntity = { id: "1", grupo: "Plasticaucho Industrial S.A.", idFiscal: "1890010667001" };
    const gruposEntity2: GruposEntity = { id: "2", grupo: "Ambato", idFiscal: "123457891" };
    this.lstGrupos.push(gruposEntity);
    this.lstGrupos.push(gruposEntity2);
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      paging: false,
      search: false,
      searching: false,
      ordering: false,
      info: false
    }

    this.httpService.obtenerGrupos().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error.',
          text: res.descripcionError,
          showConfirmButton: false,
          // timer: 3000
        });
      } else {
        console.log(res);
      }
    })
  }

  editarGrupos(grupo: GruposEntity): void {
    console.log(`Editar ${grupo.grupo}`);
  }

  eliminarGrupos(grupo: GruposEntity): void {
    Swal.fire({
      icon:'question',
      title: `¿Esta seguro de eliminar ${grupo.grupo}?`,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if(result.isConfirmed){
        console.log("Eliminar Grupo");
      }
    })
  }

}
