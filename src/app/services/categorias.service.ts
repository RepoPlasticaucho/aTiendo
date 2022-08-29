import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorias, CategoriasEntity } from '../models/categorias';

const initCategory: CategoriasEntity = {
  id: "",
  categoria: "",
  cod_sap: "",
  etiquetas: ""
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private category$ = new BehaviorSubject<CategoriasEntity>(initCategory);

  constructor(private readonly http: HttpClient) { }

  get obtenercategoria$(): Observable<CategoriasEntity> {
    return this.category$.asObservable();
  }

  asignarCategoria(categoria: CategoriasEntity) {
    this.category$.next(categoria);
  }

  obtenerCategorias(): Observable<Categorias> {
    return this.http.get<Categorias>(`${environment.apiUrl}categorias/ObtenerCategorias`);
  }

  agregarCategoria(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/InsertarCategorias`, categoria);
  }

  eliminarCategoria(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/EliminarCategorias`, categoria);
  }

  actualizarCategoria(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/ModificarCategorias`, categoria);
  }

}
