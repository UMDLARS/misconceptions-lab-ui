import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompletelyanonymousComponent} from './completelyanonymous.component';

describe('CompletelyanonymousComponent', () => {
  let component: CompletelyanonymousComponent;
  let fixture: ComponentFixture<CompletelyanonymousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletelyanonymousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletelyanonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
