import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstrellacineComponent } from './alta-estrellacine.component';

describe('AltaEstrellacineComponent', () => {
  let component: AltaEstrellacineComponent;
  let fixture: ComponentFixture<AltaEstrellacineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEstrellacineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstrellacineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
