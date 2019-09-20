import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmsalitaComponent } from './abmsalita.component';

describe('AbmsalitaComponent', () => {
  let component: AbmsalitaComponent;
  let fixture: ComponentFixture<AbmsalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmsalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmsalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
