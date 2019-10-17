import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EncryptionIsEnoughComponent} from './encryption-is-enough.component';

describe('EncryptionIsEnoughComponent', () => {
  let component: EncryptionIsEnoughComponent;
  let fixture: ComponentFixture<EncryptionIsEnoughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncryptionIsEnoughComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionIsEnoughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
