import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtSenderIdWhiteListComponent } from './gt-sender-id-white-list.component';

describe('GtSenderIdWhiteListComponent', () => {
  let component: GtSenderIdWhiteListComponent;
  let fixture: ComponentFixture<GtSenderIdWhiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtSenderIdWhiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtSenderIdWhiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
