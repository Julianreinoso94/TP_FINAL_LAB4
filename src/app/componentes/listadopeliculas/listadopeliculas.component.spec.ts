import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadopeliculasComponent } from './listadopeliculas.component';

describe('ListadopeliculasComponent', () => {
  let component: ListadopeliculasComponent;
  let fixture: ComponentFixture<ListadopeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadopeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadopeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
