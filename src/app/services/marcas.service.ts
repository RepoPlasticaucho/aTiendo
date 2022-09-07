import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marcas, MarcasEntity } from '../models/marcas';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private readonly http: HttpClient) { }

  obtenerMarcas(): Observable<Marcas> {
    return this.http.get<Marcas>(`${environment.apiUrl}marcas/ObtenerMarcas`);
  }

  eliminarMarca(marca: MarcasEntity): Observable<Marcas> {
    return this.http.post<Marcas>(`${environment.apiUrl}marcas/EliminarMarcas`, marca);
  }

}
