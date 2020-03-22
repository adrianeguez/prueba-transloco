import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorDiapositivaComponent } from './visor-diapositiva.component';

describe('VisorDiapositivaComponent', () => {
  let component: VisorDiapositivaComponent;
  let fixture: ComponentFixture<VisorDiapositivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorDiapositivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorDiapositivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
