import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAreNotMaliciousComponent } from './users-are-not-malicious.component';

describe('UsersAreNotMaliciousComponent', () => {
  let component: UsersAreNotMaliciousComponent;
  let fixture: ComponentFixture<UsersAreNotMaliciousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAreNotMaliciousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAreNotMaliciousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
