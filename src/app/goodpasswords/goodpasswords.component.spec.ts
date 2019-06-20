import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodpasswordsComponent } from './goodpasswords.component';

describe('GoodpasswordsComponent', () => {
  let component: GoodpasswordsComponent;
  let fixture: ComponentFixture<GoodpasswordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodpasswordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodpasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
