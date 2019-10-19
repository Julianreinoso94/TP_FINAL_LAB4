import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaLogueoComponent } from './alerta-logueo.component';

describe('AlertaLogueoComponent', () => {
  let component: AlertaLogueoComponent;
  let fixture: ComponentFixture<AlertaLogueoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaLogueoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaLogueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
