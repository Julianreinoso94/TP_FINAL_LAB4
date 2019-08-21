import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProfesorComponent } from './tabla-profesor.component';

describe('TablaProfesorComponent', () => {
  let component: TablaProfesorComponent;
  let fixture: ComponentFixture<TablaProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
