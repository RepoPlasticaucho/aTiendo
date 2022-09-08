import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloProductos, ModeloProductosEntity } from '../models/modeloproductos';

const initModelProduct: ModeloProductosEntity = {
  id: "",
  atributo: "",
  atributo_id: "",
  cod_familia: "",
  cod_sap: "",
  color: "",
  color_id: "",
  genero: "",
  genero_id: "",
  marca: "",
  marca_id: "",
  modelo: "",
  modelo_id: "",
  modelo_producto: ""
}

@Injectable({
  providedIn: 'root'
})
export class ModeloproductosService {

  private modelProduct$ = new BehaviorSubject<ModeloProductosEntity>(initModelProduct);

  constructor(private readonly http: HttpClient) { }

  get obtenermodeloproducto$(): Observable<ModeloProductosEntity> {
    return this.modelProduct$.asObservable();
  }

  asignarModeloProducto(modeloProducto: ModeloProductosEntity) {
    this.modelProduct$.next(modeloProducto);
  }

  obtenerModelosProductos(): Observable<ModeloProductos> {
    return this.http.get<ModeloProductos>(`${environment.apiUrl}modeloProducto/ObtenerModeloProductos`);
  }

  agregarModeloProducto(modeloProducto: ModeloProductosEntity): Observable<ModeloProductos> {
    return this.http.post<ModeloProductos>(`${environment.apiUrl}modeloProducto/InsertarModeloProductos`, modeloProducto);
  }

  actualizarModeloProducto(modeloProducto: ModeloProductosEntity): Observable<ModeloProductos> {
    return this.http.post<ModeloProductos>(`${environment.apiUrl}modeloProducto/ModificarModeloProductos`, modeloProducto);
  }

  eliminarModeloProducto(modeloProducto: ModeloProductosEntity): Observable<ModeloProductos> {
    return this.http.post<ModeloProductos>(`${environment.apiUrl}modeloProducto/EliminarModeloProductos`, modeloProducto);
  }

}
