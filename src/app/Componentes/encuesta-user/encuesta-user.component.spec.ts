import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaUserComponent } from './encuesta-user.component';

describe('EncuestaUserComponent', () => {
  let component: EncuestaUserComponent;
  let fixture: ComponentFixture<EncuestaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
