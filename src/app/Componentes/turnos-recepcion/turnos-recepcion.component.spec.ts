import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosRecepcionComponent } from './turnos-recepcion.component';

describe('TurnosRecepcionComponent', () => {
  let component: TurnosRecepcionComponent;
  let fixture: ComponentFixture<TurnosRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
