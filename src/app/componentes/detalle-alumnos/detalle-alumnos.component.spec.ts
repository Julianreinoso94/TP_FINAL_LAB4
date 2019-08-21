import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlumnosComponent } from './detalle-alumnos.component';

describe('DetalleAlumnosComponent', () => {
  let component: DetalleAlumnosComponent;
  let fixture: ComponentFixture<DetalleAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
