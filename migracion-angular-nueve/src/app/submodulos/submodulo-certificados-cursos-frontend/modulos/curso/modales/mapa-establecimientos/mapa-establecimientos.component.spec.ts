import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEstablecimientosComponent } from './mapa-establecimientos.component';

describe('MapaEstablecimientosComponent', () => {
  let component: MapaEstablecimientosComponent;
  let fixture: ComponentFixture<MapaEstablecimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaEstablecimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
