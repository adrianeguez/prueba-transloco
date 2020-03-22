import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDiapositivasComponent } from './barra-diapositivas.component';

describe('BarraDiapositivasComponent', () => {
  let component: BarraDiapositivasComponent;
  let fixture: ComponentFixture<BarraDiapositivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraDiapositivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDiapositivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
