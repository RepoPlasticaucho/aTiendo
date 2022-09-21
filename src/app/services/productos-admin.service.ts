import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductAdm } from '../models/productadm';

@Injectable({
  providedIn: 'root'
})
export class ProductosAdminService {

  constructor(private readonly http: HttpClient) { }

  obtenerProductos(): Observable<ProductAdm> {
    return this.http.get<ProductAdm>(`${environment.apiUrl}productos/ObtenerProductos`);
  }

}
