import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabQuizComponent} from './quiz.component';

describe('LabQuizComponent', () => {
  let component: LabQuizComponent;
  let fixture: ComponentFixture<LabQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabQuizComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
