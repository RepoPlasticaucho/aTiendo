import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPedidoModelosComponent } from './inventarios-pedido-modelos.component';

describe('InventariosPedidoModelosComponent', () => {
  let component: InventariosPedidoModelosComponent;
  let fixture: ComponentFixture<InventariosPedidoModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariosPedidoModelosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosPedidoModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
