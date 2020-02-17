import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistoriaClinicaComponent } from './mi-historia-clinica.component';

describe('MiHistoriaClinicaComponent', () => {
  let component: MiHistoriaClinicaComponent;
  let fixture: ComponentFixture<MiHistoriaClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiHistoriaClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
