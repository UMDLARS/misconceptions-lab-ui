import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivacyNotImportantComponent} from './privacy-not-important.component';

describe('PrivacyNotImportantComponent', () => {
  let component: PrivacyNotImportantComponent;
  let fixture: ComponentFixture<PrivacyNotImportantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyNotImportantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyNotImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
