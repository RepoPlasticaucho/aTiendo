import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { GruposEntity } from 'src/app/models/grupos';
import { RolesEntity } from 'src/app/models/roles';
import { GruposService } from 'src/app/services/grupos.service';
import { RolesService } from 'src/app/services/roles.service';
import { SociedadesService } from 'src/app/services/sociedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sociedades-create',
  templateUrl: './sociedades-create.component.html',
  styleUrls: ['./sociedades-create.component.css']
})
export class SociedadesCreateComponent implements OnInit {

  //Iconos para la pagina de grupos
  faTimes = faTimes;
  faUserFriends = faUserFriends;
  faSave = faSave;
  //Creación de la variable para formulario
  corporationForm = new FormGroup({
    grupo: new FormControl('0', Validators.required),
    idFiscal: new FormControl('', [Validators.required, Validators.minLength(10)]),
    nombreComercial: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required, Validators.minLength(5)]),
    perfil: new FormControl('0', Validators.required),
  });
  //Variables para listas desplegables
  lstGrupos: GruposEntity[] = [];
  lstRoles: RolesEntity[] = [];
  selectGrupo: boolean = false;
  selectRol: boolean = false;

  constructor(private readonly httpService: SociedadesService,
    private readonly httpServiceGrupos: GruposService,
    private readonly httpServiceRoles: RolesService) { }

  ngOnInit(): void {
    //Obtener Grupos
    this.httpServiceGrupos.obtenerGrupos().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Grupos.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstGrupos = res.lstGrupos;
        console.log(this.lstGrupos);
      }
    })
    //Obtener Roles
    this.httpServiceRoles.obtenerRoles().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener Roles.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstRoles = res.lstRoles;
        console.log(this.lstGrupos);
      }
    })
  }

  onSubmit(): void {
    if (!this.corporationForm.valid) {
      this.corporationForm.markAllAsTouched();
      if (this.corporationForm.get("grupo")?.value == "0") {
        this.selectGrupo = true;
      }
      if (this.corporationForm.get("perfil")?.value == "0") {
        this.selectRol = true;
      }
    } else {
      if (this.corporationForm.get("grupo")?.value == "0") {
        this.selectGrupo = true;
      } else if (this.corporationForm.get("perfil")?.value == "0") {
        this.selectRol = true;
      }
      else {
        console.log("Guardar Información");
        var contrasenia=this.corporationForm.get("contrasenia")?.value;
        contrasenia=btoa(contrasenia??"");
        console.log(contrasenia)
      }
      // const grupoEntity: GruposEntity = {
      //   id: "",
      //   grupo: this.groupForm.value!.grupo ?? "",
      //   idFiscal: this.groupForm.value!.idFiscal ?? "",
      // }
      // console.log(grupoEntity);
      // this.httpService.agregarGrupo(grupoEntity).subscribe(res => {
      //   if (res.codigoError == "OK") {
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Guardado Exitosamente.',
      //       text: `Se ha creado el grupo ${this.groupForm.value.grupo}`,
      //       showConfirmButton: true,
      //       confirmButtonText: "Ok"
      //     }).finally(() => {
      //       // this.groupForm.reset();
      //       // this.router.navigate(["/grupos"]);
      //     });
      //   } else {
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Ha ocurrido un error.',
      //       text: res.descripcionError,
      //       showConfirmButton: false,
      //     });
      //   }
      // })
    }
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  changeGroup(grupo: any): void {
    if (grupo.target.value == 0) {
      this.selectGrupo = true;
    } else {
      this.selectGrupo = false;
      this.corporationForm.get("grupo")?.setValue(grupo.target.value);
    }
  }
  changeRole(rol: any): void {
    if (rol.target.value == 0) {
      this.selectRol = true;
    } else {
      this.selectRol = false;
      this.corporationForm.get("perfil")?.setValue(rol.target.value);
    }
  }

}
