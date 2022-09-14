import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Almacenes, AlmacenesEntity } from '../models/almacenes';
import { CategoriasEntity } from '../models/categorias';
import { Inventarios, InventariosEntity } from '../models/inventarios';
import { LineasEntity } from '../models/lineas';
import { ModelosEntity } from '../models/modelos';

const initGruop: InventariosEntity = {
  categoria_id: "",
  categoria: "",
  linea_id: "",
  linea: "",
  modelo_id: "",
  marca_id: "",
  marca: "",
  modelo_producto_id: "",
  idProducto: "",
  Producto: "",
  id: "",
  dInventario: "",
  producto_id: "",
  almacen_id: "",
  almacen: "",
  stock: "",
  stock_optimo: "",
  fav: "",
  color: ''
}

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  private inventario$ = new BehaviorSubject<InventariosEntity>(initGruop);

  constructor(private readonly http: HttpClient) { }

  get obtenerInventario$(): Observable<InventariosEntity> {
    return this.inventario$.asObservable();
  }

  //Asignacion de Clase para la API
  asignarInventario(inventario: InventariosEntity) {
    this.inventario$.next(inventario);
  }
  asignarCategoria(inventario: InventariosEntity) {
    this.inventario$.next(inventario);
  }
  asignarLinea(inventario: InventariosEntity) {
    this.inventario$.next(inventario);
  }
  asignarModelo(inventario: InventariosEntity) {
    this.inventario$.next(inventario);
  }
  asignarColor(inventario: InventariosEntity) {
    this.inventario$.next(inventario);
  }

  // Obtencion de datos para Filtros

  obtenerModelosMProducto(modelo: ModelosEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}modeloProducto/ObtenerModeloProductosModelos`, modelo );
  }

  obtenerLineasCategoria(categoria: CategoriasEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}lineas/ObtenerLineasCategoria`, categoria );
  }

  obtenerModelosLineas(linea: LineasEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}modelos/ObtenerModelosLineas`, linea );
  }

  obtenerCategoria(): Observable<Inventarios> {
    return this.http.get<Inventarios>(`${environment.apiUrl}categorias/ObtenerCategorias` );
  }

  // Obtencion de datos para las tablas
  
  obtenerInventario(): Observable<Inventarios> {
    return this.http.get<Inventarios>(`${environment.apiUrl}inventarios/ObtenerInventarios`);
  }

  obtenerPortafolios(almacen: AlmacenesEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}inventarios/ObtenerPortafolios`, almacen );
  }

  obtenerPortafoliosCategoria(inventario: InventariosEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}inventarios/ObtenerPortafoliosCategoria`,inventario );
  }
  
  obtenerPortafoliosLineas(inventario: InventariosEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}inventarios/ObtenerPortafoliosLineas`,inventario );
  }
  obtenerPortafoliosModelos(inventario: InventariosEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}inventarios/ObtenerPortafoliosModelos`,inventario );
  }
  obtenerPortafoliosColores(inventario: InventariosEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}inventarios/ObtenerPortafoliosColores`,inventario );
  }
  
}
