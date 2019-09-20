import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnosPacienteComponent } from './ver-turnos-paciente.component';

describe('VerTurnosPacienteComponent', () => {
  let component: VerTurnosPacienteComponent;
  let fixture: ComponentFixture<VerTurnosPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTurnosPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
