import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEspecialidadesComponent } from './estadisticas-especialidades.component';

describe('EstadisticasEspecialidadesComponent', () => {
  let component: EstadisticasEspecialidadesComponent;
  let fixture: ComponentFixture<EstadisticasEspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasEspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
