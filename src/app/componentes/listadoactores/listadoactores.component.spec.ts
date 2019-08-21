import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoactoresComponent } from './listadoactores.component';

describe('ListadoactoresComponent', () => {
  let component: ListadoactoresComponent;
  let fixture: ComponentFixture<ListadoactoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoactoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
