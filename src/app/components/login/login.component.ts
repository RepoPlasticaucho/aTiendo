import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { faCopy, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SociedadesEntity } from 'src/app/models/sociedades';
import { SociedadesService } from 'src/app/services/sociedades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Categorias', cols: 1, rows: 1, name: "las categorias de productos", figure: "file_copy" },
          { title: 'Lineas', cols: 1, rows: 1, name: "las lineas de productos", figure: "assignment" }
          
        ];
      }

      return [
        { title: 'Categorias', cols: 1, rows: 1, name: "las categorias de productos", figure: "file_copy", dir: "navegation-adm/(contentAdmin:categorias)" },
        { title: 'Lineas', cols: 1, rows: 1, name: "las lineas de productos", figure: "assignment", dir: "navegation-adm/(contentAdmin:lineas)" }
       
      ];
    })
  );

  faTimes = faTimes;
  faCopy = faCopy;
  faSave = faSave;
  //Creación de la variable para formulario
  categoryForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    codigoSAP: new FormControl('', Validators.required),
    etiquetas: new FormControl('',),
  });
  private db: any;
  
  constructor(private breakpointObserver: BreakpointObserver, private readonly httpService: SociedadesService, private router: Router) {}

  ngOnInit(): void {
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
        funcion: ''
      }
      this.httpService.obtenerUsuario(userEntity).subscribe(res => {
        if (res.codigoError == "OK") {
          const sociedadEntity: SociedadesEntity = {
            idGrupo: '',
            nombre_comercial: '',
            id_fiscal: '',
            email: this.categoryForm.value!.categoria ?? "",
            funcion : '',
            telefono: '',
            password: this.categoryForm.value!.codigoSAP ?? ""
          }
          this.httpService.obtenerSociedadL(sociedadEntity).subscribe(res => {
            if (res.codigoError == "OK") {
              const rol = res.lstSociedades[0].funcion;
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
