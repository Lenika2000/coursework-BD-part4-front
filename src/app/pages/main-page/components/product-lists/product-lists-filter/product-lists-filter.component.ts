import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-lists-filter',
  templateUrl: './product-lists-filter.component.html',
  styleUrls: ['./product-lists-filter.component.css']
})
export class ProductListsFilterComponent implements OnInit {

  @Input() listName;
  @Input() isConfirm;
  @Input() shoppingListNames;

  constructor() { }

  ngOnInit(): void {
  }

  changeListName(): void {

  }

}
