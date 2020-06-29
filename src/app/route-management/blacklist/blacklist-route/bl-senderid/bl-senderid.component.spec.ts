import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlSenderidComponent } from './bl-senderid.component';

describe('BlSenderidComponent', () => {
  let component: BlSenderidComponent;
  let fixture: ComponentFixture<BlSenderidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlSenderidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlSenderidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
