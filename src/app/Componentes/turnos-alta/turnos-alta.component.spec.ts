import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAltaComponent } from './turnos-alta.component';

describe('TurnosAltaComponent', () => {
  let component: TurnosAltaComponent;
  let fixture: ComponentFixture<TurnosAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
