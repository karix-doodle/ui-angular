import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrRmSenderidComponent } from './cr-rm-senderid.component';

describe('CrRmSenderidComponent', () => {
  let component: CrRmSenderidComponent;
  let fixture: ComponentFixture<CrRmSenderidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrRmSenderidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrRmSenderidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
