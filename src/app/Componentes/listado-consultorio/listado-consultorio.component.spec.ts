import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultorioComponent } from './listado-consultorio.component';

describe('ListadoConsultorioComponent', () => {
  let component: ListadoConsultorioComponent;
  let fixture: ComponentFixture<ListadoConsultorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoConsultorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoConsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
