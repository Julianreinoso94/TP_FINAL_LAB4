import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoresultadoComponent } from './listadoresultado.component';

describe('ListadoresultadoComponent', () => {
  let component: ListadoresultadoComponent;
  let fixture: ComponentFixture<ListadoresultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoresultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoresultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
