import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDebriefComponent } from './lab-debrief.component';

describe('LabDebriefComponent', () => {
  let component: LabDebriefComponent;
  let fixture: ComponentFixture<LabDebriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabDebriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDebriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
