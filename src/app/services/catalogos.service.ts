import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Catalogos, CatalogosEntity } from '../models/catalogos';
import { Categorias, CategoriasEntity } from '../models/categorias';


const initGruop: CatalogosEntity = {

    id: '',
    codigo : '',
    material: '',
    talla : '',
    subfamilia : '',
    familia : '',
    marca : '',
    tipo : '',
    producto : '',
    color : '',
    caracteristica : '',
    genero : '',
    categoria : '',
    moelo_producto : '',
    modelo_producto_id : '',
    linea_producto_id : ''
}

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private catalogo$ = new BehaviorSubject<CatalogosEntity>(initGruop);

  constructor(private readonly http: HttpClient) { }

  get obtenerCatalogos$(): Observable<CatalogosEntity> {
    return this.catalogo$.asObservable();
  }

  //Asignacion de Clase para la API
  asignarCatalogo(catalogo: CatalogosEntity) {
    this.catalogo$.next(catalogo);
  }
  
  obtenerCatalogo(): Observable<Catalogos> {
    return this.http.get<Catalogos>(`${environment.apiUrl}catalogos/ObtenerCatalogos`);
  }
  
  obtenerCategoriasNombre(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/ObtenerCategoriaNombre`, categoria );
  }
  agregarCategoria(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/InsertarCategorias`, categoria);
  }
}
