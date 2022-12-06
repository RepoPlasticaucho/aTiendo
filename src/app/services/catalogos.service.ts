import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Atributos, AtributosEntity } from '../models/atributos';
import { Catalogos, CatalogosEntity } from '../models/catalogos';
import { Categorias, CategoriasEntity } from '../models/categorias';
import { Colors, ColorsEntity } from '../models/colors';
import { Generos, GenerosEntity } from '../models/generos';
import { Marcas, MarcasEntity } from '../models/marcas';


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
  
  //FUNCIONES OBTENER  Y AGREGAR CATEGORIAS//
  obtenerCategoriasNombre(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/ObtenerCategoriaNombre`, categoria );
  }
  agregarCategoria(categoria: CategoriasEntity): Observable<Categorias> {
    return this.http.post<Categorias>(`${environment.apiUrl}categorias/InsertarCategorias`, categoria);
  }

  //FUNCIONES OBTENER  Y AGREGAR MARCAS//
  obtenerMarcasNombre(marca: MarcasEntity): Observable<Marcas> {
    return this.http.post<Marcas>(`${environment.apiUrl}marcas/ObtenerMarcaNombre`, marca);
  }
  agregarMarca(marca: MarcasEntity): Observable<Marcas> {
    return this.http.post<Marcas>(`${environment.apiUrl}marcas/InsertarMarcas`, marca);
  }

  //FUNCIONES OBTENER  Y AGREGAR COLORES//
  obtenerColoresNombre(color: ColorsEntity): Observable<Colors> {
    return this.http.post<Colors>(`${environment.apiUrl}colores/ObtenerColoresNombre`, color);
  }

  agregarColor(color: ColorsEntity): Observable<Colors> {
    return this.http.post<Colors>(`${environment.apiUrl}colores/InsertarColores`, color);
  }

  ///FUNCIONES OBTENER Y CARGAR ATRIBUTOS
  obtenerAtributoNombre(atributo: AtributosEntity): Observable<Atributos> {
    return this.http.post<Atributos>(`${environment.apiUrl}atributos/ObtenerAtributosNombre`, atributo);
  }
  agregarAtributo(atributo: AtributosEntity): Observable<Atributos> {
    return this.http.post<Atributos>(`${environment.apiUrl}atributos/InsertarAtributos`, atributo);
  }

  ///FUNCIONES OBTENER Y CARGAR GENEROS///
  obtenerGenerosNombre(genero: GenerosEntity): Observable<Generos> {
    return this.http.post<Generos>(`${environment.apiUrl}generos/ObtenerGenerosNombre`, genero);
  }

  agregarGenero(genero: GenerosEntity): Observable<Generos> {
    return this.http.post<Generos>(`${environment.apiUrl}generos/InsertarGeneros`, genero);
  }
}
