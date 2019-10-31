import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabActivityComponent} from './lab-activity.component';

describe('LabActivityComponent', () => {
  let component: LabActivityComponent;
  let fixture: ComponentFixture<LabActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabActivityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
