import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustUsersComponent } from './trust-users.component';

describe('TrustUsersComponent', () => {
  let component: TrustUsersComponent;
  let fixture: ComponentFixture<TrustUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
