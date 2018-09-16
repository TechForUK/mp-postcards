import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSentComponent } from './card-sent.component';

describe('CardSentComponent', () => {
  let component: CardSentComponent;
  let fixture: ComponentFixture<CardSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
