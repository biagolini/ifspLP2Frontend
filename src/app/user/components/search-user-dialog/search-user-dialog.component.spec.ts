import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserDialogComponent } from './search-user-dialog.component';

describe('SearchUserDialogComponent', () => {
  let component: SearchUserDialogComponent;
  let fixture: ComponentFixture<SearchUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUserDialogComponent]
    });
    fixture = TestBed.createComponent(SearchUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
