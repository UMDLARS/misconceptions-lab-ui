import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotatargetComponent } from './notatarget.component';

describe('NotatargetComponent', () => {
  let component: NotatargetComponent;
  let fixture: ComponentFixture<NotatargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotatargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotatargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
