import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SecurityinmindComponent} from './securityinmind.component';

describe('SecurityinmindComponent', () => {
  let component: SecurityinmindComponent;
  let fixture: ComponentFixture<SecurityinmindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityinmindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityinmindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
