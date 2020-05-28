import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayManagementComponent } from './gateway-management.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GatewayManagementComponent', () => {
  let component: GatewayManagementComponent;
  let fixture: ComponentFixture<GatewayManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatewayManagementComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
