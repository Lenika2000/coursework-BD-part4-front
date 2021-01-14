import {Component, OnInit, ViewChild} from '@angular/core';
import {FinanceElem, FinanceFilter} from '../../../../models/finance.model';
import {MatTable} from '@angular/material/table';
import {GroupByData} from '../../../../models/activity.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateFinanceDialogComponent} from './add-update-finance-dialog/add-update-finance-dialog.component';
import {of} from 'rxjs';
import {pairwise, startWith} from 'rxjs/operators';
import {sortDataByTimeASC} from '../home-page/home-page.component';

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
  groupedData: Array<any> = new Array<any>();
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
  selectedElem: FinanceElem;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.groupData();
  }

  groupData(): void {
    this.groupedData = [];
    this.finance = this.sortDataByTimeASC(this.finance);
    this.changeFilter();
    of(...this.filteredTableData).pipe(
      startWith(null),
      pairwise(),
    ).subscribe(([prevPair, pair]) => {
        if (!prevPair) {
          this.groupedData.push(new GroupByData(pair.date.toLocaleDateString(), true));
          this.groupedData.push(pair);
        } else {
          if (prevPair.date.toLocaleDateString() === pair.date.toLocaleDateString()) {
            this.groupedData.push(pair);
          } else {
            this.groupedData.push(new GroupByData(pair.date.toLocaleDateString(), true));
            this.groupedData.push(pair);
          }
        }
      }
    ).unsubscribe();
  }

  openAddUpdateDialog(isAddOperation: boolean, financeElem: FinanceElem): MatDialogRef<AddUpdateFinanceDialogComponent, any>  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '450px';
    dialogConfig.width = '376px';
    dialogConfig.data = {
      financeElem,
      isAddOperation
    };
    if (!isAddOperation) {
      this.selectedElem = financeElem;
    }
    return this.dialog.open(AddUpdateFinanceDialogComponent, dialogConfig);
  }

  addElem(): void {
    const financeElem: FinanceElem =  {
      type: 'Доход',
      sum: 0,
      description: '',
      date: new Date()
    };
    const dialogRef = this.openAddUpdateDialog(true, financeElem);

    dialogRef.componentInstance.elemAdd.subscribe((newRow) => {
      this.finance.push(newRow);
      this.groupData();
      this.table.renderRows();
      // todo сервер
    });
  }

  updateElem(financeElem: FinanceElem): void {
    this.selectedElem = financeElem;
    const dialogRef = this.openAddUpdateDialog(false, financeElem);

    dialogRef.componentInstance.elemUpdate.subscribe((updatedElem: FinanceElem) => {
      this.selectedElem.type = updatedElem.type;
      this.selectedElem.date = updatedElem.date;
      this.selectedElem.sum = updatedElem.sum;
      this.selectedElem.description = updatedElem.description;
      this.groupData();
      this.table.renderRows();
      // todo сервер
    });
  }

  deleteElem(elem: FinanceElem): void {
    const deletedElemIndex = this.finance.findIndex((d: FinanceElem) => d === elem);
    this.finance.splice(deletedElemIndex, 1);
    this.groupData();
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

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  sortDataByTimeASC(tableData: any): any[] {
    return (tableData.sort((a, b) => {
      return (a.date.getTime() - b.date.getTime());
    }));
  }
}
