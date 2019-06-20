import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityproductComponent } from './securityproduct.component';

describe('SecurityproductComponent', () => {
  let component: SecurityproductComponent;
  let fixture: ComponentFixture<SecurityproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
