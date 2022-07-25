import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupos } from '../models/grupos';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private readonly http: HttpClient) { }

  obtenerGrupos(): Observable<Grupos> {
    return this.http.get<Grupos>(`${environment.apiUrl}grupos/ObtenerGrupos`);
  }

}
