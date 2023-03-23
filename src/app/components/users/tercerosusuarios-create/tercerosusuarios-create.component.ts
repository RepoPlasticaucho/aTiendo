import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { CiudadesEntity } from 'src/app/models/ciudades';
import { ProvinciasEntity } from 'src/app/models/provincias';
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
     tipo_tercero: new FormControl('0', Validators.required),
     tipo_usuario: new FormControl('0', Validators.required),
     ciudad: new FormControl('0', Validators.required),
     provincia: new FormControl('0', Validators.required),
     nombre: new FormControl('', [Validators.required]),
     correo: new FormControl('', [Validators.required]),
     direccion: new FormControl('', [Validators.required]),
     codigo: new FormControl('', [Validators.required]),
     fecha_nac: new FormControl('', [Validators.required]),
     telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
   });

    //Variables para listas desplegables
   
    lstProvincias: ProvinciasEntity[] = [];
    selectProvincias:  ProvinciasEntity={
      id: '0',
      provincia: '',
      codigo: '',
      created_at: '',
      update_at: ''
    };
    //Variables para ejecucion del Form
    lstCiudades: CiudadesEntity[] = [];
    selectCiudades : boolean = false;

    lstTipoTerceros: TipotercerosEntity[] = [];
    selectTipoTercero : boolean = false;
    
    lstTipoUsuarios: TipousuariosEntity[] = [];
    selectTipoUsuario : boolean = false;
    

    constructor(
      private readonly httpService: TercerosService,
      private readonly httpServiceProvincias: ProvinciasService,
      private readonly httpServiceCiudades: CiudadesService,
      private readonly httpServiceTipoTercero: TipotercerosService,
      private readonly httpServiceTipoUsuario : TipousuariosService,
      private router: Router) { }

  ngOnInit(): void {

  this.httpServiceTipoTercero.obtenerTipoterceros().subscribe(res =>{
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

  onSubmit(){

  }
  
  // Combo dependendiente de evento 
  onSelect(e: any){
    const provincian : ProvinciasEntity ={
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
      }else{
        this.lstCiudades = res.lstCiudades;
      }
    })
  }

  //Validaciones de comboxs 
  changeGroup1(ciudad: any): void {
    if (ciudad.target.value == 0) {
      this.selectCiudades = true;
    } else {
      this.selectCiudades = false;
      //this.warehousesForm.get("sociedad")?.setValue(sociedad.target.value);
    }
  }
  changeGroup2(tipotercero: any): void {
    if (tipotercero.target.value == 0) {
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
  

  visualizarAlmacenes(){

  }
}
