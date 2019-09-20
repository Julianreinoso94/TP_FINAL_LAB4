import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarTurnosRecepcionComponent } from './habilitar-turnos-recepcion.component';

describe('HabilitarTurnosRecepcionComponent', () => {
  let component: HabilitarTurnosRecepcionComponent;
  let fixture: ComponentFixture<HabilitarTurnosRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitarTurnosRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarTurnosRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
