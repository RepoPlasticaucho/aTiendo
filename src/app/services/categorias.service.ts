import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categorias, CategoriasEntity } from '../models/categorias';
import * as PouchDB from 'pouchdb-browser';

const initCategory: CategoriasEntity = {
  id: "",
  categoria: "",
  cod_sap: "",
  etiquetas: "",
  almacen_id: ''
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private category$ = new BehaviorSubject<CategoriasEntity>(initCategory);
  private db: any;

  constructor(private readonly http: HttpClient) {
    //Generamos nuestra bdd para categorias
    this.db = new PouchDB('BDCategorias');
  }

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

  agregarCategoriaBDD(categoria: CategoriasEntity) {
    this.db.get(categoria.id)
      .then((doc: any) => {
        delete categoria.id;
        doc = Object.assign(doc, categoria);
        this.db.put(doc);
      }).catch(() => {
        this.db.puf(categoria);
      });
  }

}
