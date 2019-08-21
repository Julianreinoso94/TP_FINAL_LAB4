import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Anagrama2Component } from './anagrama2.component';

describe('Anagrama2Component', () => {
  let component: Anagrama2Component;
  let fixture: ComponentFixture<Anagrama2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Anagrama2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Anagrama2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
