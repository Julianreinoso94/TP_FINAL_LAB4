import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProfesionalComponent } from './modificar-profesional.component';

describe('ModificarProfesionalComponent', () => {
  let component: ModificarProfesionalComponent;
  let fixture: ComponentFixture<ModificarProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
