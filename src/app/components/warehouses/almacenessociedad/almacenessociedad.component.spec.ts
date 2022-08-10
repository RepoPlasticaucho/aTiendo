import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenessociedadComponent } from './almacenessociedad.component';

describe('AlmacenessociedadComponent', () => {
  let component: AlmacenessociedadComponent;
  let fixture: ComponentFixture<AlmacenessociedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenessociedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenessociedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
