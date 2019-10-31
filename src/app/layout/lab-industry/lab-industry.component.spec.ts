import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabIndustryComponent} from './lab-industry.component';

describe('LabIndustryComponent', () => {
  let component: LabIndustryComponent;
  let fixture: ComponentFixture<LabIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabIndustryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
