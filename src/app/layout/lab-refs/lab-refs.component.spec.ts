import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabRefsComponent } from './lab-refs.component';

describe('LabRefsComponent', () => {
  let component: LabRefsComponent;
  let fixture: ComponentFixture<LabRefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabRefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabRefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
