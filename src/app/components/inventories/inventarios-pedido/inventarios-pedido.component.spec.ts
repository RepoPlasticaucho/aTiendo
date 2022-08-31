import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPedidoComponent } from './inventarios-pedido.component';

describe('InventariosPedidoComponent', () => {
  let component: InventariosPedidoComponent;
  let fixture: ComponentFixture<InventariosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariosPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
