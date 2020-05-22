import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlMobileSenderidComponent } from './bl-mobile-senderid.component';

describe('BlMobileSenderidComponent', () => {
  let component: BlMobileSenderidComponent;
  let fixture: ComponentFixture<BlMobileSenderidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlMobileSenderidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlMobileSenderidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
