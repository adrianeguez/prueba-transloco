import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioBuscarEdificioComponent } from './formulario-buscar-edificio.component';

describe('FormularioBuscarEdificioComponent', () => {
  let component: FormularioBuscarEdificioComponent;
  let fixture: ComponentFixture<FormularioBuscarEdificioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioBuscarEdificioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioBuscarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
