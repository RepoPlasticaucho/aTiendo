import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPedidoLineasComponent } from './inventarios-pedido-lineas.component';

describe('InventariosPedidoLineasComponent', () => {
  let component: InventariosPedidoLineasComponent;
  let fixture: ComponentFixture<InventariosPedidoLineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariosPedidoLineasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosPedidoLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
