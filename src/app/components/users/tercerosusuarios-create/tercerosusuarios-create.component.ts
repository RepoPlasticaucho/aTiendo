import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { CiudadesEntity } from 'src/app/models/ciudades';
import { ProvinciasEntity } from 'src/app/models/provincias';
import { Tipo_tercerosEntity } from 'src/app/models/tipo_tercero';
import { Tipo_usuariosEntity } from 'src/app/models/tipo_usuario';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { TercerosService } from 'src/app/services/terceros.service';
import { Tipo_terceroService } from 'src/app/services/tipo_terceros.service';
import { Tipo_usuariosService } from 'src/app/services/tipo_usuarios.service';
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
    lstCiudades: CiudadesEntity[] = [];
    selectCiudades : boolean = false;

    lstTipoTercero: Tipo_tercerosEntity[] = [];
    selectTipoTercero : boolean = false;
    
    lstTipoUsuario: Tipo_usuariosEntity[] = [];
    selectTipoUsuario : boolean = false;

    constructor(
      private readonly httpService: TercerosService,
      private readonly httpServiceProvincias: ProvinciasService,
      private readonly httpServiceCiudades: CiudadesService,
      private readonly httpServiceTipoTercero: Tipo_terceroService,
      private readonly httpServiceTipoUsuaio: Tipo_usuariosService,
      private router: Router) { }

  ngOnInit(): void {

  //Obtener Combox padres 

  this.httpServiceTipoTercero.obtenerTipo_terceros().subscribe(res => {
    if (res.codigoError != "OK") {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo obtener la Sociedad.',
        text: res.descripcionError,
        showConfirmButton: false,
      });
    }else{
      this.lstTipoTercero = res.lstTipo_Terceros;
      console.log(res);
    }
  })

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
      console.log(this.lstProvincias); 
    }
  })

  this.httpServiceTipoUsuaio.obtenerTipo_usuarios().subscribe(res => {
    if (res.codigoError != "OK") {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo obtener la Sociedad.',
        text: res.descripcionError,
        showConfirmButton: false,
      });
    }else{
      this.lstTipoUsuario = res.lstTipo_Usuarios;  
      
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
    console.log(provincian);

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


  changeGroup1(ciudad: any): void {
    if (ciudad.target.value == 0) {
      this.selectCiudades = true;
    } else {
      this.selectCiudades = false;
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
