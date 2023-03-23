import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tipousuarios, TipousuariosEntity } from '../models/tipousuario';

const initGruop: TipousuariosEntity = {
    id : '',
    usuario: ''
    
}

@Injectable({
    providedIn: 'root'
})

export class TipousuariosService {

    private tipousuario$ = new BehaviorSubject<TipousuariosEntity>(initGruop);

    constructor(private readonly http: HttpClient) { }
  
    get obtenerpronvincia$(): Observable<TipousuariosEntity> {
      return this.tipousuario$.asObservable();
    }

    asignarTipousuario(tipousuario: TipousuariosEntity) {
        this.tipousuario$.next(tipousuario);
    }
    
    obtenerTipousuarios(): Observable<Tipousuarios> {
        return this.http.get<Tipousuarios>(`${environment.apiUrl}tipo_usuario/ObtenerTipo_Usuario`);
    }
}