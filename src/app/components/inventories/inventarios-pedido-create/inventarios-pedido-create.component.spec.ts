import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPedidoCreateComponent } from './inventarios-pedido-create.component';

describe('InventariosPedidoCreateComponent', () => {
  let component: InventariosPedidoCreateComponent;
  let fixture: ComponentFixture<InventariosPedidoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariosPedidoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosPedidoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
