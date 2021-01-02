import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateActivityDialogComponent } from './add-update-activity-dialog.component';

describe('AddActivityDialogComponent', () => {
  let component: AddUpdateActivityDialogComponent;
  let fixture: ComponentFixture<AddUpdateActivityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateActivityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
