import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalsecurityComponent } from './physicalsecurity.component';

describe('PhysicalsecurityComponent', () => {
  let component: PhysicalsecurityComponent;
  let fixture: ComponentFixture<PhysicalsecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalsecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalsecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
