import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-cl',
  templateUrl: './dashboard-cl.component.html',
  styleUrls: ['./dashboard-cl.component.css']
})
export class DashboardClComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Ingresos', cols: 1, rows: 1 , name:"grupos", figure:"book"},
          { title: 'Egresos', cols: 1, rows: 1 , name:"grupos"},
          { title: 'Saldos', cols: 1, rows: 1 , name:"grupos"},
          { title: 'Productos', cols: 1, rows: 1 , name:"productos"},
          { title: 'Inventarios', cols: 1, rows: 1, name:"productos" },
          { title: 'Pedido Sugerido', cols: 1, rows: 1 , name:"productos"},
          { title: 'Movimientos', cols: 1, rows: 1 , name:"productos"},
          { title: 'Almacenes', cols: 1, rows: 1 , name:"productos"}

        ];
      }

      return [
          { title: 'Ingresos', cols: 1, rows: 1 , name:"grupos", figure:"book"},
          { title: 'Egresos', cols: 1, rows: 1 , name:"grupos", figure:"book"},
          { title: 'Saldos', cols: 1, rows: 1 , name:"grupos", figure:"book"},
          { title: 'Productos', cols: 1, rows: 1 , name:"productos", figure:"apps"},
          { title: 'Inventarios', cols: 1, rows: 1, name:"productos" , figure:"apps" },
          { title: 'Pedido Sugerido', cols: 1, rows: 1 , name:"productos", figure:"widgets"},
          { title: 'Movimientos', cols: 1, rows: 1 , name:"productos", figure:"monitor"},
          { title: 'Almacenes', cols: 1, rows: 1 , name:"productos", figure:"location_city"}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
