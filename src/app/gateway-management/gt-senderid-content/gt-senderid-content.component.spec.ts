import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtSenderidContentComponent } from './gt-senderid-content.component';

describe('GtSenderidContentComponent', () => {
  let component: GtSenderidContentComponent;
  let fixture: ComponentFixture<GtSenderidContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GtSenderidContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtSenderidContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
