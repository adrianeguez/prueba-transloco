import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdficioDetalleComponent } from './edficio-detalle.component';

describe('EdficioDetalleComponent', () => {
  let component: EdficioDetalleComponent;
  let fixture: ComponentFixture<EdficioDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdficioDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdficioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
