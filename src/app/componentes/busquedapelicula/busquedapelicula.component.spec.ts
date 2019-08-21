import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedapeliculaComponent } from './busquedapelicula.component';

describe('BusquedapeliculaComponent', () => {
  let component: BusquedapeliculaComponent;
  let fixture: ComponentFixture<BusquedapeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedapeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedapeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
