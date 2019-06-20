import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityByObscurityComponent } from './security-by-obscurity.component';

describe('SecurityByObscurityComponent', () => {
  let component: SecurityByObscurityComponent;
  let fixture: ComponentFixture<SecurityByObscurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityByObscurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityByObscurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
