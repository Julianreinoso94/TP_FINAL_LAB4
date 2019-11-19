import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAltaEspecialistaComponent } from './turnos-alta-especialista.component';

describe('TurnosAltaEspecialistaComponent', () => {
  let component: TurnosAltaEspecialistaComponent;
  let fixture: ComponentFixture<TurnosAltaEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosAltaEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAltaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
