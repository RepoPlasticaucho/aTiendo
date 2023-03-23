import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tipo_terceros, Tipo_tercerosEntity } from '../models/tipo_tercero';

const initGruop: Tipo_tercerosEntity = {
    id : '',
    descripcion: '',
    codigo: '',
    created_at : '',
    update_at : '',
}

@Injectable({
    providedIn: 'root'
})

export class Tipo_terceroService {

    private tipo_tercero$ = new BehaviorSubject<Tipo_tercerosEntity>(initGruop);

    constructor(private readonly http: HttpClient) { }

    get obtenertipo_tercero$(): Observable<Tipo_tercerosEntity> {
        return this.tipo_tercero$.asObservable();
    }
  
    asignarTipo_terceros(tipo_tercero: Tipo_tercerosEntity) {
        this.tipo_tercero$.next(tipo_tercero);
    }
      
    obtenerTipo_terceros(): Observable<Tipo_terceros> {
        return this.http.get<Tipo_terceros>(`${environment.apiUrl}tipo_tercero/ObtenerTipo_Tercero`);
    }
}