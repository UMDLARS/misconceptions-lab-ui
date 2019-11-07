import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabCheckComponent} from './lab-check.component';

describe('LabCheckComponent', () => {
  let component: LabCheckComponent;
  let fixture: ComponentFixture<LabCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabCheckComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
