import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoneliminapeliculasComponent } from './botoneliminapeliculas.component';

describe('BotoneliminapeliculasComponent', () => {
  let component: BotoneliminapeliculasComponent;
  let fixture: ComponentFixture<BotoneliminapeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoneliminapeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoneliminapeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
