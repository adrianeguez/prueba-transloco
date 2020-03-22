import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaGestionArticuloProveedorComponent } from './ruta-gestion-articulo-proveedor.component';

describe('RutaGestionArticuloProveedorComponent', () => {
  let component: RutaGestionArticuloProveedorComponent;
  let fixture: ComponentFixture<RutaGestionArticuloProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaGestionArticuloProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaGestionArticuloProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
