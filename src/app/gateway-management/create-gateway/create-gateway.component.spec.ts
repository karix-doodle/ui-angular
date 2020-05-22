import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGatewayComponent } from './create-gateway.component';

describe('CreateGatewayComponent', () => {
  let component: CreateGatewayComponent;
  let fixture: ComponentFixture<CreateGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
