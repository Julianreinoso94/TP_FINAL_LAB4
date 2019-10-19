import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTurnosComponent } from './estadisticas-turnos.component';

describe('EstadisticasTurnosComponent', () => {
  let component: EstadisticasTurnosComponent;
  let fixture: ComponentFixture<EstadisticasTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
