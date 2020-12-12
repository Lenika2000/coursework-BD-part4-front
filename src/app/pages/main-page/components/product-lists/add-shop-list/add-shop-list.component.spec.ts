import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopListComponent } from './add-shop-list.component';

describe('AddShopListComponent', () => {
  let component: AddShopListComponent;
  let fixture: ComponentFixture<AddShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
