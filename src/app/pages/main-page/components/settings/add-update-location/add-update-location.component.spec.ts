import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLocationComponent } from './add-update-location.component';

describe('AddUpdateLocationComponent', () => {
  let component: AddUpdateLocationComponent;
  let fixture: ComponentFixture<AddUpdateLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
