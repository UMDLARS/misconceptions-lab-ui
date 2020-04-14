import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BakebotComponent } from './bakebot.component';

describe('BakebotComponent', () => {
  let component: BakebotComponent;
  let fixture: ComponentFixture<BakebotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BakebotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BakebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
