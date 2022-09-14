import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Modelos, ModelosEntity } from '../models/modelos';

const initModel: ModelosEntity = {
  id: "",
  linea_id: "",
  linea_nombre: "",
  modelo: "",
  cod_sap: "",
  etiquetas: ""
}

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  private model$ = new BehaviorSubject<ModelosEntity>(initModel);

  constructor(private readonly http: HttpClient) { }

  get obtenermodelo$(): Observable<ModelosEntity> {
    return this.model$.asObservable();
  }

  asignarModelo(modelo: ModelosEntity) {
    this.model$.next(modelo);
  }

  obtenerModelos(): Observable<Modelos> {
    return this.http.get<Modelos>(`${environment.apiUrl}modelos/ObtenerModelos`);
  }

  agregarModelo(modelo: ModelosEntity): Observable<Modelos> {
    return this.http.post<Modelos>(`${environment.apiUrl}modelos/InsertarModelos`, modelo);
  }

  actualizarModelo(modelo: ModelosEntity): Observable<Modelos> {
    return this.http.post<Modelos>(`${environment.apiUrl}modelos/ModificarModelos`, modelo);
  }

  eliminarModelo(modelo: ModelosEntity): Observable<Modelos> {
    return this.http.post<Modelos>(`${environment.apiUrl}modelos/EliminarModelos`, modelo);
  }

}
