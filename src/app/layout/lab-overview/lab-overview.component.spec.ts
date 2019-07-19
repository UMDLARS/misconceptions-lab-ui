import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabOverviewComponent} from './lab-overview.component';

describe('LabOverviewComponent', () => {
  let component: LabOverviewComponent;
  let fixture: ComponentFixture<LabOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
