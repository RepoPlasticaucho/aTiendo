import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCopy, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SociedadesService } from 'src/app/services/sociedades.service';

@Component({
  selector: 'app-usuario-pass',
  templateUrl: './usuario-pass.component.html',
  styleUrls: ['./usuario-pass.component.css']
})
export class UsuarioPassComponent implements OnInit {
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
  constructor( private readonly httpService: SociedadesService, private router: Router) { }

  ngOnInit(): void {
  }

  onPass(): void{
    
    this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['usuario'] } }]);
  }
  onSubmit(){

  }
}
