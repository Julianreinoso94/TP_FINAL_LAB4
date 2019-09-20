import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEspecialistaComponent } from './edit-especialista.component';

describe('EditEspecialistaComponent', () => {
  let component: EditEspecialistaComponent;
  let fixture: ComponentFixture<EditEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
