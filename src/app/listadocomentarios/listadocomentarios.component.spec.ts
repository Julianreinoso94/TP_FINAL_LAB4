import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadocomentariosComponent } from './listadocomentarios.component';

describe('ListadocomentariosComponent', () => {
  let component: ListadocomentariosComponent;
  let fixture: ComponentFixture<ListadocomentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadocomentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadocomentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
