import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Almacenes, AlmacenesEntity } from '../models/almacenes';
import { CategoriasEntity } from '../models/categorias';
import { Inventarios, InventariosEntity } from '../models/inventarios';

const initGruop: InventariosEntity = {
  categoria_id : "",
  categoria : "",
  linea_id : "",
  linea : "",
  modelo_id : "",
  marca_id : "",
  marca : "",
  modelo_producto_id : "",
  idProducto : "",
  Producto : "",
  id : "",
  dInventario : "",
  producto_id : "",
  almacen_id : "",
  almacen : "",
  stock : "",
  stock_optimo : "",
  fav : "",
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

  asignarInventario(inventario: InventariosEntity) {
    this.inventario$.next(inventario);
  }

  obtenerInventario(): Observable<Inventarios> {
    return this.http.get<Inventarios>(`${environment.apiUrl}inventarios/ObtenerInventarios`);
  }

  obtenerPortafolios(almacen: AlmacenesEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}inventarios/ObtenerPortafolios`, almacen );
  }

  obtenerLineasCategoria(categoria: CategoriasEntity): Observable<Inventarios> {
    return this.http.post<Inventarios>(`${environment.apiUrl}lineas/ObtenerPortafolios`, categoria );
  }
  
  obtenerCategoria(): Observable<Inventarios> {
    return this.http.get<Inventarios>(`${environment.apiUrl}categorias/ObtenerCategorias` );
  }
}
