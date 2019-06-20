import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncrapterComponent } from './encrapter.component';

describe('EncrapterComponent', () => {
  let component: EncrapterComponent;
  let fixture: ComponentFixture<EncrapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncrapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncrapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
