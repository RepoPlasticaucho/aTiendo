import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { SociedadesEntity } from 'src/app/models/sociedades';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { SociedadesService } from 'src/app/services/sociedades.service';
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
    lstSociedades: SociedadesEntity[] = [];
    selectSociedades: boolean = false;
  
 
    constructor(private readonly httpService: AlmacenesService,
      private readonly httpServiceSociedades: SociedadesService,
      private router: Router) { }

  ngOnInit(): void {
  //Obtener Grupos
  this.httpServiceSociedades.obtenerSociedades().subscribe(res => {
    if (res.codigoError != "OK") {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo obtener la Sociedad.',
        text: res.descripcionError,
        showConfirmButton: false,
      });
    } else {
      this.lstSociedades = res.lstSociedades;
      console.log(this.lstSociedades);
    }
  })
}

  onSubmit(){

  }

  changeGroup(sociedad: any): void {
    if (sociedad.target.value == 0) {
      this.selectSociedades = true;
    } else {
      this.selectSociedades = false;
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
