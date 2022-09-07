import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPedidoColoresComponent } from './inventarios-pedido-colores.component';

describe('InventariosPedidoColoresComponent', () => {
  let component: InventariosPedidoColoresComponent;
  let fixture: ComponentFixture<InventariosPedidoColoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariosPedidoColoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosPedidoColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
