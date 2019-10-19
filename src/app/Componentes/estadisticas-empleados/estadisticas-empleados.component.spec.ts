import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEmpleadosComponent } from './estadisticas-empleados.component';

describe('EstadisticasEmpleadosComponent', () => {
  let component: EstadisticasEmpleadosComponent;
  let fixture: ComponentFixture<EstadisticasEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
