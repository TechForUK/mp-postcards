import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTopicComponent } from './pick-topic.component';

describe('PickTopicComponent', () => {
  let component: PickTopicComponent;
  let fixture: ComponentFixture<PickTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
