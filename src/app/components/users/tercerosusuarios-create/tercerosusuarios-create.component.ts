import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { CiudadesEntity } from 'src/app/models/ciudades';
import { ProvinciasEntity } from 'src/app/models/provincias';
import { TercerosEntity } from 'src/app/models/terceros';
import { TipotercerosEntity } from 'src/app/models/tipotercero';
import { TipousuariosEntity } from 'src/app/models/tipousuario';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { TercerosService } from 'src/app/services/terceros.service';
import { TipotercerosService } from 'src/app/services/tipotercero.service';
import { TipousuariosService } from 'src/app/services/tipousuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tercerosusuarios-create',
  templateUrl: './tercerosusuarios-create.component.html',
  styleUrls: ['./tercerosusuarios-create.component.css']
})
export class TercerosusuariosCreateComponent implements OnInit {

  //Iconos para la pagina de grupos
  faTimes = faTimes;
  faUserFriends = faUserFriends;
  faSave = faSave;
  //Creación de la variable para formulario
  TercerosForm = new FormGroup({
    tipo_tercero: new FormControl('0',),
    tipo_usuario: new FormControl('0',),
    ciudad: new FormControl('0',),
    provincia: new FormControl('0',),
    nombre: new FormControl('', [Validators.required]),
    fecha_nac: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    id_fiscal: new FormControl('', [Validators.required, Validators.minLength(9)]),
    correo: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
  });

  //Variables para listas desplegables

  lstProvincias: ProvinciasEntity[] = [];
  selectProvincias: ProvinciasEntity = {
    id: '0',
    provincia: '',
    codigo: '',
    created_at: '',
    update_at: ''
  };
  //selectProvicias: boolean = false;
  //Variables para ejecucion del Form
  lstCiudades: CiudadesEntity[] = [];
  selectCiudades: CiudadesEntity = {
    idCiudad: '',
    ciudad: '',
    provinciaid: '',
    provincia: '',
    codigo: '',
    created_at: '',
    update_at: ''
  }

  lstTipoTerceros: TipotercerosEntity[] = [];
  selectTipoTercero : boolean = false;

  /*lstTipoTerceros: TipotercerosEntity[] = [];
  selectTipoTercero: TipotercerosEntity = {
    id: '0',
    descripcion: '',
    codigo: ''
  }
  */

  lstTipoUsuarios: TipousuariosEntity[] = [];
  selectTipoUsuario: boolean = false;


  constructor(
    private readonly httpService: TercerosService,
    private readonly httpServiceProvincias: ProvinciasService,
    private readonly httpServiceCiudades: CiudadesService,
    private readonly httpServiceTipoTercero: TipotercerosService,
    private readonly httpServiceTipoUsuario: TipousuariosService,
    private router: Router) { }

  ngOnInit(): void {

    this.httpServiceTipoTercero.obtenerTipoterceros().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener la Sociedad.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstTipoTerceros = res.lstTipo_Tercero;
      }
    });

    this.httpServiceProvincias.obtenerProvincias().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener la Sociedad.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstProvincias = res.lstProvincias;
      }
    });

    this.httpServiceTipoUsuario.obtenerTipousuarios().subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener la Sociedad.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstTipoUsuarios = res.lstTipo_Usuario;
      }
    })
  }

  onSubmit() {

    if (!this.TercerosForm.valid) {

      this.TercerosForm.markAllAsTouched();
      const terceronew: TercerosEntity = {
        id: '',
        almacen_id: JSON.parse(localStorage.getItem('almacenid') || "[]"),
        sociedad_id: JSON.parse(localStorage.getItem('sociedadid') || "[]"),
        tipotercero_id: this.lstTipoTerceros[0].id,
        tipousuario_id: '',
        nombresociedad: '',
        nombrealmacen: '',
        ciudadid: this.lstCiudades[0].idCiudad,
        nombretercero: this.TercerosForm.value!.tipo_tercero ?? "",
        tipousuario: this.TercerosForm.value!.tipo_usuario ?? "",
        nombre: (this.TercerosForm.value!.nombre ?? "").concat(" " + this.TercerosForm.value!.apellido ?? ""),
        id_fiscal: this.TercerosForm.value!.id_fiscal ?? "",
        direccion: this.TercerosForm.value!.direccion ?? "",
        telefono: this.TercerosForm.value!.telefono ?? "",
        correo: this.TercerosForm.value!.correo ?? "",
        fecha_nac: this.TercerosForm.value!.fecha_nac ?? "",
        ciudad: this.TercerosForm.value!.ciudad ?? "",
        provincia: this.TercerosForm.value!.provincia ?? "",      
      }
      console.log(terceronew);
      console.log(this.lstTipoTerceros[0])
    }
  }

  // Obtener códigos
  

  // Combo dependendiente de evento 
  onSelect(e: any) {

    if (e.target.value == null || undefined) {
      this.lstCiudades = [];
    } else {
      const provincian: ProvinciasEntity = {
        id: '',
        provincia: e.target.value,
        codigo: '',
        created_at: '',
        update_at: ''
      }
      //console.log(provincian);
      this.httpServiceCiudades.obtenerCiudades(provincian).subscribe(res => {
        if (res.codigoError != "OK") {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo obtener la Sociedad.',
            text: res.descripcionError,
            showConfirmButton: false,
          });
          this.lstCiudades = [];

        } else {
          this.lstCiudades = res.lstCiudades;

        }
      })
    }

  }

  /*Validaciones de comboxs 
  changeGroup1(ciudad: any) :void{
    if (ciudad.target.value == 0) {
      this.selectCiudades = true;
    } else {
      this.selectCiudades = false;
      this.TercerosForm.get("ciudad")?.setValue(ciudad.target.value);
    }
  }*/
  changeGroup1(e: any) {
    const ciudadnew: CiudadesEntity = {
      idCiudad: '',
      ciudad: e.target.value,
      provinciaid: '',
      provincia: '',
      codigo: '',
      created_at: '',
      update_at: ''
    }
    this.httpServiceCiudades.obtenerCiudadesN(ciudadnew).subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo obtener la Sociedad.',
          text: res.descripcionError,
          showConfirmButton: false,
        });
      } else {
        this.lstCiudades = res.lstCiudades
        var cal = this.lstCiudades
        console.log(cal);
        console.log(this.TercerosForm.get("ciudad")?.value)
      }
    })
  }

  changeGroup2(tipo_tercero: any): void {
    if (tipo_tercero.target.value == 0) {
      this.selectTipoTercero = true;
    } else {
      this.selectTipoTercero = false;
      //this.warehousesForm.get("sociedad")?.setValue(sociedad.target.value);
    }
  }
  changeGroup3(tipousuario: any): void {
    if (tipousuario.target.value == 0) {
      this.selectTipoUsuario = true;
    } else {
      this.selectTipoUsuario = false;
      //this.warehousesForm.get("sociedad")?.setValue(sociedad.target.value);
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


  visualizarAlmacenes() {

  }
}
