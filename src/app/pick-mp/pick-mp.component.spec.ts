import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickMpComponent } from './pick-mp.component';

describe('PickMpComponent', () => {
  let component: PickMpComponent;
  let fixture: ComponentFixture<PickMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
