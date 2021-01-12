import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFinanceDialogComponent } from './add-update-finance-dialog.component';

describe('AddUpdateFinanceDialogComponent', () => {
  let component: AddUpdateFinanceDialogComponent;
  let fixture: ComponentFixture<AddUpdateFinanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateFinanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFinanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
