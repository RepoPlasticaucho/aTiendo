import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tipo_usuarios, Tipo_usuariosEntity } from '../models/tipo_usuario';

const initGruop: Tipo_usuariosEntity = {
    id : '',
    usuario: '',
    created_at : '',
    update_at : '',
}

@Injectable({
    providedIn: 'root'
})

export class Tipo_usuariosService {
    
    private tipo_usuario$ = new BehaviorSubject<Tipo_usuariosEntity>(initGruop);

    constructor(private readonly http: HttpClient) { }

    get obtenertipo_usuario$(): Observable<Tipo_usuariosEntity> {
        return this.tipo_usuario$.asObservable();
    }
  
    asignarTipo_usuarios(tipo_usuario: Tipo_usuariosEntity) {
        this.tipo_usuario$.next(tipo_usuario);
    }
      
    obtenerTipo_usuarios(): Observable<Tipo_usuarios> {
        return this.http.get<Tipo_usuarios>(`${environment.apiUrl}tipo_usuario/ObtenerTipo_Usuario`);
    }
}
