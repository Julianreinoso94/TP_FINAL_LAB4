import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaDeesperaComponent } from './sala-deespera.component';

describe('SalaDeesperaComponent', () => {
  let component: SalaDeesperaComponent;
  let fixture: ComponentFixture<SalaDeesperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaDeesperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaDeesperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
