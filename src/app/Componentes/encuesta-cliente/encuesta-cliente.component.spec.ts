import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaClienteComponent } from './encuesta-cliente.component';

describe('EncuestaClienteComponent', () => {
  let component: EncuestaClienteComponent;
  let fixture: ComponentFixture<EncuestaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
