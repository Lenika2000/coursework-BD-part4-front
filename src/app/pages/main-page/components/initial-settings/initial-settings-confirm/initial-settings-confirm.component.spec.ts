import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSettingsConfirmComponent } from './initial-settings-confirm.component';

describe('InitialSettingsConfirmComponent', () => {
  let component: InitialSettingsConfirmComponent;
  let fixture: ComponentFixture<InitialSettingsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSettingsConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSettingsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
