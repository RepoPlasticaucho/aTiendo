import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sociedades, SociedadesEntity } from '../models/sociedades';

@Injectable({
  providedIn: 'root'
})
export class SociedadesService {

  constructor(private readonly http: HttpClient) { }

  obtenerSociedades(): Observable<Sociedades> {
    return this.http.get<Sociedades>(`${environment.apiUrl}sociedades/ObtenerSociedades`);
  }

  eliminarSociedad(sociedad: SociedadesEntity): Observable<Sociedades> {
    return this.http.post<Sociedades>(`${environment.apiUrl}sociedades/EliminarSociedad`, sociedad);
  }
}
