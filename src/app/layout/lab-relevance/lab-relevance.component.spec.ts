import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabRelevanceComponent} from './lab-relevance.component';

describe('LabRelevanceComponent', () => {
  let component: LabRelevanceComponent;
  let fixture: ComponentFixture<LabRelevanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabRelevanceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabRelevanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
