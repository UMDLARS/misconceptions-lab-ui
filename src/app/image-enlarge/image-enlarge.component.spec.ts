import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageEnlargeComponent} from './image-enlarge.component';

describe('ImageEnlargeComponent', () => {
  let component: ImageEnlargeComponent;
  let fixture: ComponentFixture<ImageEnlargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageEnlargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEnlargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
