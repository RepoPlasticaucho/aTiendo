import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { faCopy, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasEntity } from 'src/app/models/categorias';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

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
  
  constructor(private breakpointObserver: BreakpointObserver, private readonly httpService: CategoriasService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
    } else {
      const categoriaEntity: CategoriasEntity = {
        id: "",
        categoria: this.categoryForm.value!.categoria ?? "",
        cod_sap: this.categoryForm.value!.codigoSAP ?? "",
        etiquetas: this.categoryForm.value!.etiquetas ?? "",
        almacen_id: ''
      }
      this.httpService.agregarCategoria(categoriaEntity).subscribe(res => {
        if (res.codigoError == "OK") {
          Swal.fire({
            icon: 'success',
            title: 'Guardado Exitosamente.',
            text: `Se ha creado la categoria ${this.categoryForm.value.categoria}`,
            showConfirmButton: true,
            confirmButtonText: "Ok"
          }).finally(() => {
            this.router.navigate(['/navegation-adm', { outlets: { 'contentAdmin': ['categorias'] } }]);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error.',
            text: res.descripcionError,
            showConfirmButton: false,
          });
        }
      }, () => {
        console.log("No se pudo Guardar Información");
        this.httpService.agregarCategoriaBDD(categoriaEntity);
      })
    }
  }
}
