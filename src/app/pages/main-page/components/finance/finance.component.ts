import {Component, OnInit, ViewChild} from '@angular/core';
import {FinanceElem} from '../../../../models/finance.model';
import {MatTable} from '@angular/material/table';
import {Location} from '../../../../models/activity.model';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  public displayedColumns = ['type', 'sum', 'description', 'date',
    'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<Location>;
  finance: FinanceElem[] = [
    {
      type: 'Доход',
      sum: 15000,
      description: 'Зарплата',
      date: new Date()
    },
    {
      type: 'Расход',
      sum: 150,
      description: 'Покупки в магнит',
      date: new Date()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  deleteElem(elem: FinanceElem[]): void {
    const deletedElemIndex = this.finance.findIndex((d) => d === elem);
    this.finance.splice(deletedElemIndex, 1);
    this.table.renderRows();
    // todo сервер
  }

}
