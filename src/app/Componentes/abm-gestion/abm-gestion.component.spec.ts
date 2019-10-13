import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmGestionComponent } from './abm-gestion.component';

describe('AbmGestionComponent', () => {
  let component: AbmGestionComponent;
  let fixture: ComponentFixture<AbmGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
