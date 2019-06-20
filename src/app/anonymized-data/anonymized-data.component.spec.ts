import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymizedDataComponent } from './anonymized-data.component';

describe('AnonymizedDataComponent', () => {
  let component: AnonymizedDataComponent;
  let fixture: ComponentFixture<AnonymizedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymizedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymizedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
