import {Component, OnInit, ViewChild} from '@angular/core';
import {FinanceElem, FinanceFilter} from '../../../../models/finance.model';
import {MatTable} from '@angular/material/table';
import {Location} from '../../../../models/activity.model';
import {Filters} from '../activities/filters/filters.component';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  public displayedColumns = ['type', 'sum', 'description', 'date',
    'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<Location>;
  filteredTableData: FinanceElem[];
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
  filters: FinanceFilter = {
    startDate: new Date(),
    endDate: new Date(),
    isIncome: false,
    isExpenses: false,
  };

  constructor() { }

  ngOnInit(): void {
    this.changeFilter();
  }

  deleteElem(elem: FinanceElem): void {
    const deletedElemIndex = this.finance.findIndex((d: FinanceElem) => d === elem);
    this.finance.splice(deletedElemIndex, 1);
    this.table.renderRows();
    // todo сервер
  }

  applyDateFilters(): void {
    // todo запрос на сервер
    // this.filteredTableData = this.filteredTableData.filter((row) => {
    //   return row.startTime < filters.endDate && row.startTime> === 'Дистанционный';
    // });
  }

  changeFilter(): void {
    this.filteredTableData = this.finance;
    if (this.filters.isExpenses) {
      this.filteredTableData = this.filteredTableData.filter((row) => {
        return row.type === 'Расход';
      });
    } else {
      if (this.filters.isIncome) {
        this.filteredTableData = this.filteredTableData.filter((row) => {
          return row.type === 'Доход';
        });
      }
    }
  }
}
