import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EncryptionAutoIntegrityComponent} from './encryption-auto-integrity.component';

describe('EncryptionAutoIntegrityComponent', () => {
  let component: EncryptionAutoIntegrityComponent;
  let fixture: ComponentFixture<EncryptionAutoIntegrityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptionAutoIntegrityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionAutoIntegrityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
