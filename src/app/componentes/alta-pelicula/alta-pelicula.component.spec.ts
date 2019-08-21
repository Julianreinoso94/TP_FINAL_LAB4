import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPeliculaComponent } from './alta-pelicula.component';

describe('AltaPeliculaComponent', () => {
  let component: AltaPeliculaComponent;
  let fixture: ComponentFixture<AltaPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
