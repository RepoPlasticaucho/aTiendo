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
  categoryForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    codigoSAP: new FormControl('', Validators.required),
    etiquetas: new FormControl('',),
  })
  encPass: string | undefined;
  constructor( private readonly httpService: SociedadesService, private router: Router) { }

  ngOnInit(): void {
  }

  onPass(): void{
    
    const passwordn = localStorage.getItem('passwa');
 
    console.log(passwordn);
  }
  onSubmit(): void {
    if (!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
    } else {
      const userEntity: SociedadesEntity = {
        idGrupo: '',
        nombre_comercial: '',
        id_fiscal: '',
        email: this.categoryForm.value!.categoria ?? "",
        telefono: '',
        password: '',
        funcion: '',
        idSociedad: ''
      }
      this.httpService.obtenerUsuario(userEntity).subscribe(res => {
        if (res.codigoError == "OK") {

          var salt = CryptoJS.enc.Base64.parse("SXZhbiBNZWR2ZWRldg==");
          var iv = CryptoJS.enc.Hex.parse("69135769514102d0eded589ff874cacd");
          var key564Bits10000Iterations = CryptoJS.PBKDF2("Venus21!", salt, {keySize: 256/32 + 128/32, iterations: 10000, hasher: CryptoJS.algo.SHA512});
          const pass = this.categoryForm.value!.codigoSAP ?? ""
          var encrypted = CryptoJS.AES.encrypt(pass, key564Bits10000Iterations, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });
          this.encPass= encrypted.toString();
         // console.log(this.encPass);

          const sociedadEntity: SociedadesEntity = {
            idGrupo: '',
            nombre_comercial: '',
            id_fiscal: '',
            email: this.categoryForm.value!.categoria ?? "",
            funcion: '',
            telefono: '',
            password: this.encPass,
            idSociedad: ''
          }
          

          this.httpService.obtenerSociedadL(sociedadEntity).subscribe(res => {
            if (res.codigoError == "OK") {
              const rol = res.lstSociedades[0].funcion;
              const idsociedad = res.lstSociedades[0].idSociedad;
              console.log(res);
              localStorage.setItem('sociedadid',idsociedad)
               switch (rol) {
                case "admin":
                  Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido Administrador!!!'
                    }).finally(() => {
                      this.router.navigate(['/navegation-adm']);
                    })
                  break;

                case "client":
                  Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido!!!'
                    }).finally(() => {
                      this.router.navigate(['/navegation-cl']);
                    })
                  break;
              }
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Contraseña Inconrrecta.'
              }).finally(() => {
                this.router.navigate(['/login-nav']);
              });
            }
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'El usuario no existe.'
          }).finally(() => {
            this.router.navigate(['/login-nav']);
          });

        }
      })
    }
  }
}
