import {Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-product-lists-filter',
  templateUrl: './product-lists-filter.component.html',
  styleUrls: ['./product-lists-filter.component.css']
})
export class ProductListsFilterComponent implements OnInit, OnChanges {

  @Input() listName;
  isConfirm;
  @Input() shopNamesList;
  @Output() changeShopName = new EventEmitter<string>();
  @Output() changeConfirmFilter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeListName(): void {
    this.changeShopName.emit(this.listName);
    this.changeConfirmFilter.emit(this.isConfirm);
  }

  onConfirmFilterChange(): void {
    this.changeConfirmFilter.emit(this.isConfirm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.shopNamesList) {
      this.shopNamesList = changes.shopNamesList.currentValue;
    }
  }

}
