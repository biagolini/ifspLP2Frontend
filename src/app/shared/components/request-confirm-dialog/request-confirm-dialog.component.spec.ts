import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConfirmDialogComponent } from './request-confirm-dialog.component';

describe('RequestConfirmDialogComponent', () => {
  let component: RequestConfirmDialogComponent;
  let fixture: ComponentFixture<RequestConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestConfirmDialogComponent]
    });
    fixture = TestBed.createComponent(RequestConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
