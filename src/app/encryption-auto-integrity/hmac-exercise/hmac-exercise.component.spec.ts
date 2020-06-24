import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmacExerciseComponent } from './hmac-exercise.component';

describe('HmacExerciseComponent', () => {
  let component: HmacExerciseComponent;
  let fixture: ComponentFixture<HmacExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmacExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmacExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
