import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderidTemplateRouteComponent } from './senderid-template-route.component';

describe('SenderidTemplateRouteComponent', () => {
  let component: SenderidTemplateRouteComponent;
  let fixture: ComponentFixture<SenderidTemplateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderidTemplateRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderidTemplateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
