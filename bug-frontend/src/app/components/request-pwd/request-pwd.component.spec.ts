import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPwdComponent } from './request-pwd.component';

describe('RequestPwdComponent', () => {
  let component: RequestPwdComponent;
  let fixture: ComponentFixture<RequestPwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestPwdComponent]
    });
    fixture = TestBed.createComponent(RequestPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
