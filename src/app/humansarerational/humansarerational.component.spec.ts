import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HumansarerationalComponent} from './humansarerational.component';

describe('HumansarerationalComponent', () => {
  let component: HumansarerationalComponent;
  let fixture: ComponentFixture<HumansarerationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumansarerationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumansarerationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
