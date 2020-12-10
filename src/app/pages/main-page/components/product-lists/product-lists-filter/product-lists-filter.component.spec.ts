import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListsFilterComponent } from './product-lists-filter.component';

describe('ProductListsFilterComponent', () => {
  let component: ProductListsFilterComponent;
  let fixture: ComponentFixture<ProductListsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
