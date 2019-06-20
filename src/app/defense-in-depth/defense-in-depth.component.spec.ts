import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseInDepthComponent } from './defense-in-depth.component';

describe('DefenseInDepthComponent', () => {
  let component: DefenseInDepthComponent;
  let fixture: ComponentFixture<DefenseInDepthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenseInDepthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenseInDepthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
