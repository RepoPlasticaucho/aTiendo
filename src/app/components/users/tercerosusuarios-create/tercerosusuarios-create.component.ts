import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { ProvinciasEntity } from 'src/app/models/provincias';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { TipotercerosEntity } from 'src/app/models/tipotercero';
import { TipousuariosEntity } from 'src/app/models/tipousuario';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { CiudadesEntity } from 'src/app/models/ciudades';
import { TercerosEntity } from 'src/app/models/terceros';
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
    tipo_tercero: new FormControl('0', Validators.required),
    tipo_usuario: new FormControl('0', Validators.required),
    ciudad: new FormControl('0', Validators.required),
    provincia: new FormControl('0', Validators.required),
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
  lstCiudades2: CiudadesEntity[] = [];
  selectCiudades: boolean = false;

  lstTipoTerceros: TipotercerosEntity[] = [];
  lstTipoTerceros2: TipotercerosEntity[] = [];
  selectTipoTercero: boolean = false;

  lstTipoUsuarios: TipousuariosEntity[] = [];
  lstTipoUsuarios2: TipousuariosEntity[] = [];
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

  fechaString = this.TercerosForm.get('fecha_nac')!.value ?? "";
  fecha = new Date(this.fechaString);

  anio = this.fecha.getFullYear();
  mes = this.fecha.getMonth() + 1;
  dia = this.fecha.getDate();

  fechaSQL = `${this.anio}/${this.mes.toString().padStart(2, '0')}/${this.dia.toString().padStart(2, '0')}`;

  onSubmit() {
    const tercerodatos: TercerosEntity = {
      id: '',
      almacen_id: JSON.parse(localStorage.getItem('almacenid') || "[]"),
      sociedad_id: JSON.parse(localStorage.getItem('sociedadid') || "[]"),
      tipotercero_id: this.lstTipoTerceros2[0].idTipo_tercero,
      tipousuario_id: this.lstTipoUsuarios2[0].idTipo_Usuario,
      nombresociedad: '',
      nombrealmacen: '',
      nombretercero: this.TercerosForm.value!.tipo_tercero ?? "",
      tipousuario: this.TercerosForm.value!.tipo_usuario ?? "",
      nombre: (this.TercerosForm.value!.nombre ?? "").concat(" " + this.TercerosForm.value!.apellido ?? ""),
      id_fiscal: this.TercerosForm.value!.id_fiscal ?? "",
      direccion: this.TercerosForm.value!.direccion ?? "",
      telefono: this.TercerosForm.value!.telefono ?? "",
      correo: this.TercerosForm.value!.correo ?? "",
      fecha_nac: this.fechaSQL ?? "",
      ciudad: this.TercerosForm.value!.ciudad ?? "",
      provincia: this.TercerosForm.value!.provincia ?? "",
      ciudadid: this.lstCiudades2[0].idCiudad
    }
    console.log(tercerodatos);
    console.log(this.TercerosForm.get('fecha_nac')!.value ?? "");
    console.log(this.fecha)
    
  }

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

  //Validaciones de comboxs 
  changeGroup1(ciudad: any): void {
    if (ciudad.target.value == 0) {
      this.selectCiudades = true;
    } else {
      this.selectCiudades = false;

      // Obtener la ciudad seleccionada
      const ciudadnew: CiudadesEntity = {
        idCiudad: '',
        ciudad: ciudad.target.value,
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
          this.lstCiudades2 = res.lstCiudades
        }
      })
    }
  }
  /*
  changeGroup1(e: any){
    const ciudadnew : CiudadesEntity = {
      idciudad: '',
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
      }else{
        this.lstCiudades = res.lstCiudades
        var cal = this.lstCiudades
        console.log(cal);
        console.log(this.TercerosForm.get("ciudad")?.value)
      }
    })
  }
  */
  changeGroup2(tipo_tercero: any): void {
    if (tipo_tercero.target.value == 0) {
      this.selectTipoTercero = true;
    } else {
      this.selectTipoTercero = false;

      // Obtener ID de tipo_tercero
      const tipo_terceronew: TipotercerosEntity = {
        idTipo_tercero: '',
        descripcion: tipo_tercero.target.value,
        codigo: '',
        created_at: '',
        update_at: ''
      }
      this.httpServiceTipoTercero.obtenerTipoTercerosN(tipo_terceronew).subscribe(res => {
        if (res.codigoError != "OK") {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo obtener la Sociedad.',
            text: res.descripcionError,
            showConfirmButton: false,
          });
        } else {
          this.lstTipoTerceros2 = res.lstTipo_Tercero;
        }
      })
    }

    //this.warehousesForm.get("sociedad")?.setValue(sociedad.target.value);
  }

  changeGroup3(tipousuario: any): void {
    if (tipousuario.target.value == 0) {
      this.selectTipoUsuario = true;
    } else {
      this.selectTipoUsuario = false;

      // Obtener ID de tipo_usuario

      const tipo_usuarionew: TipousuariosEntity = {
        idTipo_Usuario: '',
        usuario: tipousuario.target.value
      }
      this.httpServiceTipoUsuario.obtenerTipoUsuariosN(tipo_usuarionew).subscribe(res => {
        if (res.codigoError != "OK") {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo obtener la Sociedad.',
            text: res.descripcionError,
            showConfirmButton: false,
          });
        } else {
          this.lstTipoUsuarios2 = res.lstTipo_Usuario;
        }
      })

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
