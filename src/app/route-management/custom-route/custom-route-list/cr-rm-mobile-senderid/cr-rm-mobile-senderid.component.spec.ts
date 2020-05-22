import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrRmMobileSenderidComponent } from './cr-rm-mobile-senderid.component';

describe('CrRmMobileSenderidComponent', () => {
  let component: CrRmMobileSenderidComponent;
  let fixture: ComponentFixture<CrRmMobileSenderidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrRmMobileSenderidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrRmMobileSenderidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
