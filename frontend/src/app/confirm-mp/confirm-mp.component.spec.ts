import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMpComponent } from './confirm-mp.component';

describe('ConfirmMpComponent', () => {
  let component: ConfirmMpComponent;
  let fixture: ComponentFixture<ConfirmMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
