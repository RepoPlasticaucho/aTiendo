import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCopy, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SociedadesEntity } from 'src/app/models/sociedades';
import { SociedadesService } from 'src/app/services/sociedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
 
  
  faTimes = faTimes;
  faCopy = faCopy;
  faSave = faSave;
  //Creación de la variable para formulario
  corporationForm = new FormGroup({
    idFiscal: new FormControl('', [Validators.required, Validators.minLength(10)]),
    nombreComercial: new FormControl('', Validators.required),
    razonSocial: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
  });
  encPass: string | undefined;
  codigo: any;

  constructor( private readonly httpService: SociedadesService, private router: Router) { }

  ngOnInit(): void {

    const sociedad: SociedadesEntity = {
      idSociedad: JSON.parse(localStorage.getItem('sociedadid') || "[]"),
      idGrupo: '',
      nombre_comercial: '',
      id_fiscal: '',
      email: '',
      telefono: '',
      password: '',
      funcion: '',
      razon_social: ''
    }
    console.log(sociedad);

    this.httpService.obtenerUser(sociedad).subscribe(res => {
      if (res.codigoError != "OK") {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error.',
          text: res.descripcionError,
          showConfirmButton: false,
          // timer: 3000
        });
      } else {
        this.codigo = JSON.parse(localStorage.getItem('sociedadid')||"[]");
        this.corporationForm.get("idFiscal")?.setValue(res.lstSociedades[0].id_fiscal);
        this.corporationForm.get("nombreComercial")?.setValue(res.lstSociedades[0].nombre_comercial);
        this.corporationForm.get("razonSocial")?.setValue(res.lstSociedades[0].razon_social);
        this.corporationForm.get("correoElectronico")?.setValue(res.lstSociedades[0].email);
        this.corporationForm.get("telefono")?.setValue(res.lstSociedades[0].telefono);
      }
      console.log(res);
    })
  }

  onPass(): void{
    
      this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['usuario-pass'] } }]);

  }
  onSubmit(): void {
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
}
