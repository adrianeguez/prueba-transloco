import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarIdiomaComponent } from './cambiar-idioma.component';

describe('CambiarIdiomaComponent', () => {
  let component: CambiarIdiomaComponent;
  let fixture: ComponentFixture<CambiarIdiomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarIdiomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
