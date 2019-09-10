import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoturnosEeComponent } from './listadoturnos-ee.component';

describe('ListadoturnosEeComponent', () => {
  let component: ListadoturnosEeComponent;
  let fixture: ComponentFixture<ListadoturnosEeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoturnosEeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoturnosEeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
