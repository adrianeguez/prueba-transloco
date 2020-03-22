import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaUnoComponent } from './ruta-uno.component';

describe('RutaUnoComponent', () => {
  let component: RutaUnoComponent;
  let fixture: ComponentFixture<RutaUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
