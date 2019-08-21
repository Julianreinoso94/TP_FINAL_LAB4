import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaProfesorComponent } from './fila-profesor.component';

describe('FilaProfesorComponent', () => {
  let component: FilaProfesorComponent;
  let fixture: ComponentFixture<FilaProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilaProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
