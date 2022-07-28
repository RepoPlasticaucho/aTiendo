import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.css']
})
export class DashboardAdmComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Categorias', cols: 1, rows: 1 , name:"lineas de productos", figure:"file_copy"},
          { title: 'Lineas', cols: 1, rows: 1 , name:"lineas de productos", figure:"assignment"},
          { title: 'Modelos', cols: 1, rows: 1 , name:"lineas de productos", figure:"shopping_bag"},
          { title: 'Marcas', cols: 1, rows: 1 , name:"lineas de productos", figure:"bookmarks"},
          { title: 'Colores', cols: 1, rows: 1, name:"lineas de productos" , figure:"shopping_cart" },
          { title: 'Caracteristicas', cols: 1, rows: 1 , name:"lineas de productos", figure:"pie_chart"},
          { title: 'Generos', cols: 1, rows: 1 , name:"lineas de productos", figure:"pie_chart"},
          { title: 'Modelo Producto', cols: 1, rows: 1 , name:"lineas de productos", figure:"widgets"},
          { title: 'Productos', cols: 1, rows: 1 , name:"lineas de productos", figure:"widgets"},
          { title: 'Grupos', cols: 1, rows: 1 , name:"lineas de productos", figure:"person"},
          { title: 'Sociedades', cols: 1, rows: 1 , name:"lineas de productos", figure:"supervisor_account"},
          { title: 'Almacenes', cols: 1, rows: 1 , name:"lineas de productos", figure:"location_city"},
          { title: 'Roles', cols: 1, rows: 1 , name:"lineas de productos", figure:"lock_person"}
        ];
      }

      return [
        { title: 'Categorias', cols: 1, rows: 1 , name:"lineas de productos", figure:"file_copy"},
        { title: 'Lineas', cols: 1, rows: 1 , name:"lineas de productos", figure:"assignment"},
        { title: 'Modelos', cols: 1, rows: 1 , name:"lineas de productos", figure:"shopping_bag"},
        { title: 'Marcas', cols: 1, rows: 1 , name:"lineas de productos", figure:"bookmarks"},
        { title: 'Colores', cols: 1, rows: 1, name:"lineas de productos" , figure:"shopping_cart" },
        { title: 'Caracteristicas', cols: 1, rows: 1 , name:"lineas de productos", figure:"pie_chart"},
        { title: 'Generos', cols: 1, rows: 1 , name:"lineas de productos", figure:"pie_chart"},
        { title: 'Modelo Producto', cols: 1, rows: 1 , name:"lineas de productos", figure:"widgets"},
        { title: 'Productos', cols: 1, rows: 1 , name:"lineas de productos", figure:"widgets"},
        { title: 'Grupos', cols: 1, rows: 1 , name:"lineas de productos", figure:"person", dir:"grupos"},
        { title: 'Sociedades', cols: 1, rows: 1 , name:"lineas de productos", figure:"supervisor_account"},
        { title: 'Almacenes', cols: 1, rows: 1 , name:"lineas de productos", figure:"location_city"},
        { title: 'Roles', cols: 1, rows: 1 , name:"lineas de productos", figure:"lock_person"}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
